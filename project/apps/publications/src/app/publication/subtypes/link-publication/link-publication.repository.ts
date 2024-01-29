import { Injectable, NotFoundException } from '@nestjs/common';

import { LinkPublication, PublicationStatus, PublicationType } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publications/models';

import { LinkPublicationEntity } from './link-publication.entity';

import { PUBLICATION_QUERY } from '../../publication.constant';


@Injectable()
export class LinkPublicationRepository extends BasePostgresRepository<
  LinkPublicationEntity,
  LinkPublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, LinkPublicationEntity.fromObject);
  }

  public async save(entity: LinkPublicationEntity): Promise<LinkPublicationEntity> {
    const { url, description, tags, ...publication } = entity;
    const document = await this.client.linkPublication.create({
      include: PUBLICATION_QUERY.INCLUDE,
      data: {
        url,
        description,
        publication: {
          create: {
            id: publication.sourceId,
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
      type: document.publication.type as PublicationType.Link,
      status: document.publication.status as PublicationStatus
    });
  }

  public async findById(id: LinkPublicationEntity['id']): Promise<LinkPublicationEntity> {
    const document = await this.client.linkPublication.findFirst({
      where: {
        publicationId: id
      },
      include: PUBLICATION_QUERY.INCLUDE
    });

    if (!document) {
      throw new NotFoundException(`Link Publication with id ${id} not found.`);
    }
    return this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      publishedAt: document.publication.publishedAt,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Link,
      status: document.publication.status as PublicationStatus
    });
  }

  public async update(id: LinkPublicationEntity['id'], entity: LinkPublicationEntity): Promise<LinkPublicationEntity> {
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

    const document = await this.client.linkPublication.update({
      where: {
        publicationId: id
      },
      data: {
        url: pojoDocument.url,
        description: pojoDocument.description
      },
      include: PUBLICATION_QUERY.INCLUDE
    });
    return this.createEntityFromDocument({
      ...document,
      ...document.publication,
      id: document.publication.id,
      publishedAt: document.publication.publishedAt,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Link,
      status: document.publication.status as PublicationStatus
    });
  }

  public async deleteById(id: LinkPublicationEntity['id']): Promise<void> {
    await this.client.publication.delete({
      where: {
        id
      }
    });
  }
}
