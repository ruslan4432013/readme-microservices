import { Injectable } from '@nestjs/common';
import { PhotoPublicationRepository } from "./photo-publication.repository";
import { CreatePhotoPublicationDto, UpdatePhotoPublicationDto } from "./dto";
import { PhotoPublicationEntity } from "./photo-publication.entity";
import { PublicationTagService } from "../../../publication-tag/publication-tag.service";
import { randomUUID } from 'node:crypto';
import { PublicationStatus, PublicationType } from "@project/shared/app/types";

@Injectable()
export class PhotoPublicationService {
  constructor(
    private readonly videoPublicationRepository: PhotoPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.videoPublicationRepository.findById(id)
    return document
  }

  public async create(dto: CreatePhotoPublicationDto) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    })
    const id = randomUUID()
    const publication = new PhotoPublicationEntity({
      id,
      originalOwnerId: dto.ownerId,
      currentOwnerId: dto.ownerId,
      tags,
      photo: dto.photo,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Photo,
      status: PublicationStatus.Draft
    })
    const document = await this.videoPublicationRepository.save(publication)

    return document

  }

  public async update(id: string, dto: UpdatePhotoPublicationDto): Promise<PhotoPublicationEntity> {
    const pojoType = (await this.videoPublicationRepository.findById(id)).toPOJO()
    const titles = dto.tags || pojoType.tags?.map(el => el.title) || []
    const newTags = await this.publicationTagService.createTags({
      titles
    })
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
      tags: newTags.map(el => el.toPOJO()),
    })
    return this.videoPublicationRepository.update(id, updatedPhotoPublication)
  }

  public async delete(id: string) {
    await this.videoPublicationRepository.deleteById(id)
  }
}
