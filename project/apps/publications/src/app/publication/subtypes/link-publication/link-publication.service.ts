import { Injectable } from '@nestjs/common';
import { LinkPublicationRepository } from "./link-publication.repository";
import { CreateLinkPublicationDTO, UpdateLinkPublicationDTO } from "./dto";
import { LinkPublicationEntity } from "./link-publication.entity";
import { PublicationTagService } from "../../../publication-tag/publication-tag.service";
import { randomUUID } from 'node:crypto';
import { PublicationStatus, PublicationType } from "@project/shared/app/types";

@Injectable()
export class LinkPublicationService {
  constructor(
    private readonly linkPublicationRepository: LinkPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.linkPublicationRepository.findById(id)
    return document
  }

  public async create(dto: CreateLinkPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    })
    const id = randomUUID()
    const publication = new LinkPublicationEntity({
      id,
      originalOwnerId: dto.userId,
      currentOwnerId: dto.userId,
      tags,
      url: dto.url,
      description: dto.description,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Link,
      status: PublicationStatus.Draft
    })
    const document = await this.linkPublicationRepository.save(publication)

    return document

  }

  public async update(id: string, dto: UpdateLinkPublicationDTO): Promise<LinkPublicationEntity> {
    const pojoType = (await this.linkPublicationRepository.findById(id)).toPOJO()
    const titles = dto.tags || pojoType.tags?.map(el => el.title) || []
    const newTags = await this.publicationTagService.createTags({
      titles
    })
    const updatedLinkPublication = new LinkPublicationEntity({
      currentOwnerId: pojoType.currentOwnerId,
      isReposted: pojoType.isReposted,
      originalOwnerId: pojoType.originalOwnerId,
      sourceId: pojoType.sourceId,
      status: pojoType.status,
      type: pojoType.type,
      id: pojoType.id,
      url: pojoType.url,
      description: pojoType.description,
      ...dto,
      tags: newTags.map(el => el.toPOJO()),
    })
    return this.linkPublicationRepository.update(id, updatedLinkPublication)
  }

  public async delete(id: string) {
    await this.linkPublicationRepository.deleteById(id)
  }
}
