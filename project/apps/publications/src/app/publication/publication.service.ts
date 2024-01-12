import { BadRequestException, Injectable } from '@nestjs/common';
import { PaginationResult, PublicationType } from "@project/shared/app/types";
import { PublicationRepository } from "./publication.repository";
import { VideoPublicationService } from "./subtypes/video-publication/video-publication.service";
import { QuotePublicationService } from "./subtypes/quote-publication/quote-publication.service";
import { TextPublicationService } from "./subtypes/text-publication/text-publication.service";
import { PhotoPublicationService } from "./subtypes/photo-publication/photo-publication.service";
import { LinkPublicationService } from "./subtypes/link-publication/link-publication.service";
import { PublicationQuery } from "./query/publication.query";
import { PublicationEntitySubtypes } from "./publication.types";

@Injectable()
export class PublicationService {

  private mapper = {
    [PublicationType.Quote]: this.quotePublicationService,
    [PublicationType.Text]: this.textPublicationService,
    [PublicationType.Link]: this.linkPublicationService,
    [PublicationType.Photo]: this.photoPublicationService,
    [PublicationType.Video]: this.videoPublicationService,
  }

  constructor(
    private readonly publicationRepository: PublicationRepository,
    private readonly videoPublicationService: VideoPublicationService,
    private readonly quotePublicationService: QuotePublicationService,
    private readonly textPublicationService: TextPublicationService,
    private readonly photoPublicationService: PhotoPublicationService,
    private readonly linkPublicationService: LinkPublicationService,
  ) {
  }

  public async getAllPublications(query?: PublicationQuery): Promise<PaginationResult<PublicationEntitySubtypes>> {
    const publications = await this.publicationRepository.find(query)

    const entities = await Promise.all(publications.entities.map(async (publication) => {
      const { id } = publication
      if (!id) {
        throw new BadRequestException('Incorrect id')
      }
      return this.mapper[publication.type].findById(id)
    }))

    const result = {
      ...publications,
      entities
    }

    return result
  }

  public async getPublication(id: string): Promise<PublicationEntitySubtypes> {
    const publication = await this.publicationRepository.findById(id)
    if (!publication?.type) {
      throw new BadRequestException('Incorrect publication type')
    }
    return this.mapper[publication.type].findById(id)
  }
}
