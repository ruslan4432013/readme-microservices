import { Injectable, UnauthorizedException } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { CreateTextPublicationDTO, UpdateTextPublicationDTO } from '@project/shared/transfer-objects';

import { TextPublicationEntity } from './text-publication.entity';
import { TextPublicationRepository } from './text-publication.repository';

import { PublicationTagService } from '../../../publication-tag/publication-tag.service';

@Injectable()
export class TextPublicationService {
  constructor(
    private readonly textPublicationRepository: TextPublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.textPublicationRepository.findById(id);
    return document;
  }

  public async create(dto: CreateTextPublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    });
    const id = randomUUID();
    const publication = new TextPublicationEntity({
      id,
      originalOwnerId: dto.userId,
      currentOwnerId: dto.userId,
      tags,
      text: dto.text,
      name: dto.name,
      announcement: dto.announcement,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Text,
      status: PublicationStatus.Draft
    });
    const document = await this.textPublicationRepository.save(publication);

    return document;

  }

  public async update(id: string, updateTextPublicationDTO: UpdateTextPublicationDTO): Promise<TextPublicationEntity> {
    const { userId, ...dto } = updateTextPublicationDTO;
    const pojoType = (await this.textPublicationRepository.findById(id)).toPOJO();

    if (userId !== pojoType.currentOwnerId) {
      throw new UnauthorizedException('User is not publication owner');
    }

    const titles = dto.tags || pojoType.tags?.map(el => el.title) || [];
    const newTags = await this.publicationTagService.createTags({
      titles
    });
    const updatedTextPublication = new TextPublicationEntity({
      currentOwnerId: pojoType.currentOwnerId,
      isReposted: pojoType.isReposted,
      originalOwnerId: pojoType.originalOwnerId,
      sourceId: pojoType.sourceId,
      status: pojoType.status,
      type: pojoType.type,
      id: pojoType.id,
      text: pojoType.text,
      name: pojoType.name,
      announcement: pojoType.announcement,
      ...dto,
      tags: newTags.map(el => el.toPOJO())
    });
    return this.textPublicationRepository.update(id, updatedTextPublication);
  }

  public async delete(id: string) {
    await this.textPublicationRepository.deleteById(id);
  }
}
