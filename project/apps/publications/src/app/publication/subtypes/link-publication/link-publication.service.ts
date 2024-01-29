import { Injectable, UnauthorizedException } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { CreateLinkPublicationDTO, UpdateLinkPublicationDTO } from '@project/shared/transfer-objects';

import { LinkPublicationEntity } from './link-publication.entity';
import { LinkPublicationRepository } from './link-publication.repository';

import { PublicationTagService } from '../../../publication-tag/publication-tag.service';

@Injectable()
export class LinkPublicationService {
  constructor(
    private readonly linkPublicationRepository: LinkPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.linkPublicationRepository.findById(id);
    return document;
  }

  public async create(dto: CreateLinkPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    });
    const id = randomUUID();
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
    });
    const document = await this.linkPublicationRepository.save(publication);

    return document;

  }

  public async update(id: string, updateLinkDTO: UpdateLinkPublicationDTO): Promise<LinkPublicationEntity> {
    const { userId, ...dto } = updateLinkDTO;
    const pojoType = (await this.linkPublicationRepository.findById(id)).toPOJO();

    if (userId !== pojoType.currentOwnerId) {
      throw new UnauthorizedException('User is not publication owner');
    }

    const titles = dto.tags || pojoType.tags?.map(el => el.title) || [];
    const newTags = await this.publicationTagService.createTags({
      titles
    });


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
      tags: newTags.map(el => el.toPOJO())
    });
    return this.linkPublicationRepository.update(id, updatedLinkPublication);
  }

  public async delete(id: string) {
    await this.linkPublicationRepository.deleteById(id);
  }
}
