import { Injectable, NotFoundException } from '@nestjs/common';

import { PublicationStatus, PublicationType, VideoPublication } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publications/models';

import { VideoPublicationEntity } from './video-publication.entity';

import { PUBLICATION_QUERY } from '../../publication.constant';


@Injectable()
export class VideoPublicationRepository extends BasePostgresRepository<
  VideoPublicationEntity,
  VideoPublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, VideoPublicationEntity.fromObject);
  }

  public async save(entity: VideoPublicationEntity): Promise<VideoPublicationEntity> {
    const { link, name, tags, ...publication } = entity;
    const document = await this.client.videoPublication.create({
      include: PUBLICATION_QUERY.INCLUDE,
      data: {
        link,
        name,
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
      publishedAt: document.publication.publishedAt,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Video,
      status: document.publication.status as PublicationStatus
    });
  }

  public async findById(id: VideoPublicationEntity['id']): Promise<VideoPublicationEntity> {
    const document = await this.client.videoPublication.findFirst({
      where: {
        publicationId: id
      },
      include: PUBLICATION_QUERY.INCLUDE
    });

    if (!document) {
      throw new NotFoundException(`Video Publication with id ${id} not found.`);
    }
    const entity = this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      publishedAt: document.publication.publishedAt,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Video,
      status: document.publication.status as PublicationStatus
    });
    return entity;
  }

  public async update(id: VideoPublicationEntity['id'], entity: VideoPublicationEntity): Promise<VideoPublicationEntity> {
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

    const document = await this.client.videoPublication.update({
      where: {
        publicationId: id
      },
      data: {
        link: pojoDocument.link,
        name: pojoDocument.name
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
      type: document.publication.type as PublicationType.Video,
      status: document.publication.status as PublicationStatus
    });
  }

  public async deleteById(id: VideoPublicationEntity['id']): Promise<void> {
    await this.client.publication.delete({
      where: {
        id
      }
    });
  }
}
