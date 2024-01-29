import { Injectable, UnauthorizedException } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { CreateVideoPublicationDTO, UpdateVideoPublicationDTO } from '@project/shared/transfer-objects';

import { VideoPublicationEntity } from './video-publication.entity';
import { VideoPublicationRepository } from './video-publication.repository';

import { PublicationTagService } from '../../../publication-tag/publication-tag.service';

@Injectable()
export class VideoPublicationService {
  constructor(
    private readonly videoPublicationRepository: VideoPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.videoPublicationRepository.findById(id);
    return document;
  }

  public async create(dto: CreateVideoPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    });
    const id = randomUUID();
    const publication = new VideoPublicationEntity({
      id,
      originalOwnerId: dto.userId,
      currentOwnerId: dto.userId,
      tags,
      name: dto.name,
      link: dto.link,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Video,
      status: PublicationStatus.Draft
    });
    const document = await this.videoPublicationRepository.save(publication);

    return document;

  }

  public async update(id: string, updateVideoDTO: UpdateVideoPublicationDTO): Promise<VideoPublicationEntity> {
    const { userId, ...dto } = updateVideoDTO;
    const pojoType = (await this.videoPublicationRepository.findById(id)).toPOJO();

    if (userId !== pojoType.currentOwnerId) {
      throw new UnauthorizedException('User is not publication owner');
    }

    const titles = dto.tags || pojoType.tags?.map(el => el.title) || [];
    const newTags = await this.publicationTagService.createTags({
      titles
    });
    const updatedVideoPublication = new VideoPublicationEntity({
      currentOwnerId: pojoType.currentOwnerId,
      isReposted: pojoType.isReposted,
      originalOwnerId: pojoType.originalOwnerId,
      sourceId: pojoType.sourceId,
      status: pojoType.status,
      type: pojoType.type,
      id: pojoType.id,
      name: pojoType.name,
      link: pojoType.link,
      ...dto,
      tags: newTags.map(el => el.toPOJO())
    });
    return this.videoPublicationRepository.update(id, updatedVideoPublication);
  }

  public async delete(id: string) {
    await this.videoPublicationRepository.deleteById(id);
  }
}
