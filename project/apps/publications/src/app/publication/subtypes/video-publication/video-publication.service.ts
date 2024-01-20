import { Injectable } from '@nestjs/common';
import { VideoPublicationRepository } from "./video-publication.repository";
import { CreateVideoPublicationDTO, UpdateVideoPublicationDTO } from "./dto";
import { VideoPublicationEntity } from "./video-publication.entity";
import { PublicationTagService } from "../../../publication-tag/publication-tag.service";
import { randomUUID } from 'node:crypto';
import { PublicationStatus, PublicationType } from "@project/shared/app/types";

@Injectable()
export class VideoPublicationService {
  constructor(
    private readonly videoPublicationRepository: VideoPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.videoPublicationRepository.findById(id)
    return document
  }

  public async create(dto: CreateVideoPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    })
    const id = randomUUID()
    const publication = new VideoPublicationEntity({
      id,
      originalOwnerId: dto.ownerId,
      currentOwnerId: dto.ownerId,
      tags,
      name: dto.name,
      link: dto.link,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Video,
      status: PublicationStatus.Draft
    })
    const document = await this.videoPublicationRepository.save(publication)

    return document

  }

  public async update(id: string, dto: UpdateVideoPublicationDTO): Promise<VideoPublicationEntity> {
    const pojoType = (await this.videoPublicationRepository.findById(id)).toPOJO()
    const titles = dto.tags || pojoType.tags?.map(el => el.title) || []
    const newTags = await this.publicationTagService.createTags({
      titles
    })
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
      tags: newTags.map(el => el.toPOJO()),
    })
    return this.videoPublicationRepository.update(id, updatedVideoPublication)
  }

  public async delete(id: string) {
    await this.videoPublicationRepository.deleteById(id)
  }
}
