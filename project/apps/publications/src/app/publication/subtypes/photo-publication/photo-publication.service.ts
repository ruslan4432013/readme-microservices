import { Injectable, UnauthorizedException } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { CreatePhotoPublicationDTO, UpdatePhotoPublicationDTO } from '@project/shared/transfer-objects';

import { PhotoPublicationEntity } from './photo-publication.entity';
import { PhotoPublicationRepository } from './photo-publication.repository';

import { PublicationTagService } from '../../../publication-tag/publication-tag.service';

@Injectable()
export class PhotoPublicationService {
  constructor(
    private readonly videoPublicationRepository: PhotoPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.videoPublicationRepository.findById(id);
    return document;
  }

  public async create(dto: CreatePhotoPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    });
    const id = randomUUID();
    const publication = new PhotoPublicationEntity({
      id,
      originalOwnerId: dto.userId,
      currentOwnerId: dto.userId,
      tags,
      photo: dto.photo,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Photo,
      status: PublicationStatus.Draft
    });
    const document = await this.videoPublicationRepository.save(publication);

    return document;

  }

  public async update(id: string, { userId, ...dto }: UpdatePhotoPublicationDTO): Promise<PhotoPublicationEntity> {
    const pojoType = (await this.videoPublicationRepository.findById(id)).toPOJO();

    if (userId !== pojoType.currentOwnerId) {
      throw new UnauthorizedException('User is not publication owner');
    }

    const titles = dto.tags || pojoType.tags?.map(el => el.title) || [];
    const newTags = await this.publicationTagService.createTags({
      titles
    });
    const updatedPhotoPublication = new PhotoPublicationEntity({
      currentOwnerId: pojoType.currentOwnerId,
      isReposted: pojoType.isReposted,
      originalOwnerId: pojoType.originalOwnerId,
      sourceId: pojoType.sourceId,
      status: pojoType.status,
      type: pojoType.type,
      id: pojoType.id,
      photo: pojoType.photo,
      ...dto,
      tags: newTags.map(el => el.toPOJO())
    });
    return this.videoPublicationRepository.update(id, updatedPhotoPublication);
  }

  public async delete(id: string) {
    await this.videoPublicationRepository.deleteById(id);
  }
}
