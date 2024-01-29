import { Injectable, NotFoundException } from '@nestjs/common';

import { PublicationStatus, PublicationType, QuotePublication } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publications/models';

import { QuotePublicationEntity } from './quote-publication.entity';

import { PUBLICATION_QUERY } from '../../publication.constant';


@Injectable()
export class QuotePublicationRepository extends BasePostgresRepository<
  QuotePublicationEntity,
  QuotePublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, QuotePublicationEntity.fromObject);
  }

  public async save(entity: QuotePublicationEntity): Promise<QuotePublicationEntity> {
    const { text, author, tags, ...publication } = entity;
    const document = await this.client.quotePublication.create({
      include: PUBLICATION_QUERY.INCLUDE,
      data: {
        text,
        author,
        publication: {
          create: {
            tags: {
              connect: tags?.map(({ id }) => ({ id }))
            },
            type: publication.type,
            currentOwnerId: publication.currentOwnerId,
            isReposted: publication.isReposted,
            originalOwnerId: publication.originalOwnerId,
            sourceId: publication.sourceId,
            status: publication.status,
            comments: {
              connect: []
            }
          }
        }
      }
    });
    return this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Quote,
      status: document.publication.status as PublicationStatus
    });
  }

  public async findById(id: QuotePublicationEntity['id']): Promise<QuotePublicationEntity> {
    const document = await this.client.quotePublication.findFirst({
      where: {
        publicationId: id
      },
      include: PUBLICATION_QUERY.INCLUDE
    });

    if (!document) {
      throw new NotFoundException(`Quote Publication with id ${id} not found.`);
    }
    const entity = this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      likes: document.publication._count.like,
      publishedAt: document.publication.publishedAt,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Quote,
      status: document.publication.status as PublicationStatus
    });
    return entity;
  }

  public async update(id: QuotePublicationEntity['id'], entity: QuotePublicationEntity): Promise<QuotePublicationEntity> {
    const pojoDocument = entity.toPOJO();
    await this.client.publication.update({
      where: {
        id
      },
      data: {
        currentOwnerId: pojoDocument.currentOwnerId,
        isReposted: pojoDocument.isReposted,
        originalOwnerId: pojoDocument.originalOwnerId,
        sourceId: pojoDocument.sourceId,
        status: pojoDocument.status,
        type: pojoDocument.type,
        id: pojoDocument.id,
        tags: {
          set: pojoDocument.tags?.map(({ id }) => ({ id }))
        }
      }
    });

    const document = await this.client.quotePublication.update({
      where: {
        publicationId: id
      },
      data: {
        text: pojoDocument.text,
        author: pojoDocument.author
      },
      include: PUBLICATION_QUERY.INCLUDE
    });
    return this.createEntityFromDocument({
      ...document,
      ...document.publication,
      id: document.publication.id,
      likes: document.publication._count.like,
      publishedAt: document.publication.publishedAt,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Quote,
      status: document.publication.status as PublicationStatus
    });
  }

  public async deleteById(id: QuotePublicationEntity['id']): Promise<void> {
    await this.client.publication.delete({
      where: {
        id
      }
    });
  }
}
