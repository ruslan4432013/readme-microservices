import { Injectable, NotFoundException } from '@nestjs/common';

import { BasePostgresRepository } from '@project/shared/core';
import { Comment } from '@project/shared/app/types';
import { PrismaClientService } from "@project/shared/publications/models";
import { PublicationCommentEntity } from "./publication-comment.entity";
import { MAX_COMMENTS_COUNT } from "./publication-comment.constant";


@Injectable()
export class PublicationCommentRepository extends BasePostgresRepository<PublicationCommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService,
  ) {
    super(client, PublicationCommentEntity.fromObject);
  }

  public async save(entity: PublicationCommentEntity): Promise<PublicationCommentEntity> {
    const record = await this.client.comment.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        publicationId: entity.publicationId,
      },
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PublicationCommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id,
      },
      take: MAX_COMMENTS_COUNT,
    });

    if (! record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record)
  }

  public async findByPublicationId(publicationId: string): Promise<PublicationCommentEntity[]> {
    const records = await this.client.comment.findMany({
      where: {
        publicationId,
      }
    });

    return records.map(record => this.createEntityFromDocument(record))
  }
}
