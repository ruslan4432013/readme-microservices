import { Injectable, UnauthorizedException } from '@nestjs/common';

import { randomUUID } from 'node:crypto';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { CreateQuotePublicationDTO, UpdateQuotePublicationDTO } from '@project/shared/transfer-objects';

import { QuotePublicationEntity } from './quote-publication.entity';
import { QuotePublicationRepository } from './quote-publication.repository';

import { PublicationTagService } from '../../../publication-tag/publication-tag.service';

@Injectable()
export class QuotePublicationService {
  constructor(
    private readonly quotePublicationRepository: QuotePublicationRepository,
    private readonly publicationTagService: PublicationTagService
  ) {
  }

  public async findById(id: string) {
    const document = await this.quotePublicationRepository.findById(id);
    return document;
  }

  public async create(dto: CreateQuotePublicationDTO) {
    const tags = await this.publicationTagService.createTags({
      titles: dto.tags || []
    });
    const id = randomUUID();
    const publication = new QuotePublicationEntity({
      id,
      originalOwnerId: dto.userId,
      currentOwnerId: dto.userId,
      tags,
      text: dto.text,
      author: dto.author,
      sourceId: id,
      isReposted: false,
      type: PublicationType.Quote,
      status: PublicationStatus.Draft
    });
    const document = await this.quotePublicationRepository.save(publication);

    return document;

  }

  public async update(id: string, { userId, ...dto }: UpdateQuotePublicationDTO): Promise<QuotePublicationEntity> {
    const pojoType = (await this.quotePublicationRepository.findById(id)).toPOJO();

    if (userId !== pojoType.currentOwnerId) {
      throw new UnauthorizedException('User is not publication owner');
    }
    
    const titles = dto.tags || pojoType.tags?.map(el => el.title) || [];
    const newTags = await this.publicationTagService.createTags({
      titles
    });
    const updatedQuotePublication = new QuotePublicationEntity({
      currentOwnerId: pojoType.currentOwnerId,
      isReposted: pojoType.isReposted,
      originalOwnerId: pojoType.originalOwnerId,
      sourceId: pojoType.sourceId,
      status: pojoType.status,
      type: pojoType.type,
      id: pojoType.id,
      text: pojoType.text,
      author: pojoType.author,
      ...dto,
      tags: newTags.map(el => el.toPOJO())
    });
    return this.quotePublicationRepository.update(id, updatedQuotePublication);
  }

  public async delete(id: string) {
    await this.quotePublicationRepository.deleteById(id);
  }
}
