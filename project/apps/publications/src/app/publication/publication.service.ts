import { BadRequestException, ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';

import { PaginationResult, PublicationStatus, PublicationType } from '@project/shared/app/types';
import { LikeDTO, UpdateBasePublicationDTO } from '@project/shared/transfer-objects';

import { MESSAGES } from './publication.constant';
import { PublicationRepository } from './publication.repository';
import { PublicationEntitySubtypes } from './publication.types';
import { FindPublicationQuery } from './query/find-publication.query';
import { NotifyPublicationQuery } from './query/notify-publication.query';
import { PublicationQuery } from './query/publication.query';
import { LinkPublicationService } from './subtypes/link-publication/link-publication.service';
import { PhotoPublicationService } from './subtypes/photo-publication/photo-publication.service';
import { QuotePublicationService } from './subtypes/quote-publication/quote-publication.service';
import { TextPublicationService } from './subtypes/text-publication/text-publication.service';
import { VideoPublicationService } from './subtypes/video-publication/video-publication.service';

@Injectable()
export class PublicationService {

  private mapper = {
    [PublicationType.Quote]: this.quotePublicationService,
    [PublicationType.Text]: this.textPublicationService,
    [PublicationType.Link]: this.linkPublicationService,
    [PublicationType.Photo]: this.photoPublicationService,
    [PublicationType.Video]: this.videoPublicationService
  };

  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly videoPublicationService: VideoPublicationService,
    private readonly quotePublicationService: QuotePublicationService,
    private readonly textPublicationService: TextPublicationService,
    private readonly photoPublicationService: PhotoPublicationService,
    private readonly linkPublicationService: LinkPublicationService
  ) {
  }

  public async getAllPublications(query?: PublicationQuery, hasDraft?: boolean): Promise<PaginationResult<PublicationEntitySubtypes>> {
    const publications = await this.publicationRepository.find(query, hasDraft);

    const entities = await Promise.all(publications.entities.map(async (publication) => {
      const { id } = publication;
      if (!id) {
        throw new BadRequestException('Incorrect id');
      }
      return this.mapper[publication.type].findById(id);
    }));

    const result = {
      ...publications,
      entities
    };

    return result;
  }

  public async getPublication(id: string): Promise<PublicationEntitySubtypes> {
    const publication = await this.publicationRepository.findById(id);
    if (!publication?.type) {
      throw new BadRequestException('Incorrect publication type');
    }
    return this.mapper[publication.type].findById(id);
  }

  public async findNew(query: NotifyPublicationQuery) {
    return this.publicationRepository.findNewPublications(query);
  }

  public async search(query: FindPublicationQuery) {
    return this.publicationRepository.search(query);
  }


  public async update(id: string, { userId, ...dto }: UpdateBasePublicationDTO): Promise<PublicationEntitySubtypes> {
    const existedPublication = await this.publicationRepository.findById(id);
    if (existedPublication?.currentOwnerId !== userId) {
      throw new UnauthorizedException(MESSAGES.NOT_OWNER);
    }

    const updateDTO = { ...dto };
    if (dto.status === PublicationStatus.Published) {
      updateDTO.publishedAt = new Date();
    }

    const publication = await this.publicationRepository.update(id, updateDTO);
    if (!publication.id) {
      throw new BadRequestException(MESSAGES.INCORRECT_PUBLICATION_ID(id));
    }
    return this.getPublication(publication.id);
  }

  public async getUserPublicationCount(userId: string): Promise<number> {
    return this.publicationRepository.getUserPublicationCount(userId);
  }


  public async repost(publicationId: string, userId?: string) {
    const sourcePublication = await this.getPublication(publicationId);
    if (sourcePublication.currentOwnerId === userId) {
      throw new ConflictException(MESSAGES.OWNER_AND_USER_SAME);
    }

    if (!userId) {
      throw new BadRequestException(MESSAGES.UNKNOWN_USER);
    }
    const reposted = await this.publicationRepository.repost(publicationId, userId);
    return this.getPublication(reposted.id);
  }

  public async like(dto: LikeDTO) {
    const existedLike = await this.publicationRepository.getLike(dto);
    const publication = await this.publicationRepository.findById(dto.publicationId);
    if (publication?.status !== PublicationStatus.Published) {
      throw new ConflictException(MESSAGES.PUBLICATION_NOT_PUBLISHED);
    }
    if (existedLike) {
      throw new ConflictException(MESSAGES.LIKE_EXIST);
    }
    return await this.publicationRepository.like(dto);
  }

  public async dislike(dto: LikeDTO) {
    const existedLike = await this.publicationRepository.getLike(dto);
    if (!existedLike) {
      throw new ConflictException(MESSAGES.NO_LIKE);
    }
    return this.publicationRepository.dislike(dto);
  }
}
