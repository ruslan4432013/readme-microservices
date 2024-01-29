import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { Comment, PaginationResult } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publications/models';

import { MAX_COMMENTS_COUNT } from './publication-comment.constant';
import { PublicationCommentEntity } from './publication-comment.entity';
import { PublicationCommentQuery } from './query/publication-comment.query';

import { DEFAULT } from '../publication/publication.constant';


@Injectable()
export class PublicationCommentRepository extends BasePostgresRepository<PublicationCommentEntity, Comment> {
  constructor(
    protected readonly client: PrismaClientService
  ) {
    super(client, PublicationCommentEntity.fromObject);
  }

  public async removeComment(id: string) {
    await this.client.comment.delete({
      where: { id }
    });
  }

  private async getCommentsCount(where: Prisma.CommentWhereInput): Promise<number> {
    return this.client.comment.count({ where });
  }

  private calculateCommentsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async find(query: PublicationCommentQuery, publicationId: string): Promise<PaginationResult<PublicationCommentEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit || DEFAULT.PUBLICATION_COUNT_LIMIT;
    const where: Prisma.CommentWhereInput = {
      publicationId
    };
    const orderBy: Prisma.CommentOrderByWithAggregationInput = {
      createdAt: 'desc'
    };

    const [records, publicationCount] = await Promise.all([
      this.client.comment.findMany({
        where, orderBy, skip, take
      }),
      this.getCommentsCount(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument(record)),
      currentPage: query?.page || 1,
      totalPages: this.calculateCommentsPage(publicationCount, take),
      itemsPerPage: take || DEFAULT.PUBLICATION_COUNT_LIMIT,
      totalItems: publicationCount
    };
  }

  public async save(entity: PublicationCommentEntity): Promise<PublicationCommentEntity> {
    const record = await this.client.comment.create({
      data: {
        message: entity.message,
        userId: entity.userId,
        publicationId: entity.publicationId
      }
    });

    entity.id = record.id;
    return entity;
  }

  public async findById(id: string): Promise<PublicationCommentEntity> {
    const record = await this.client.comment.findFirst({
      where: {
        id
      },
      take: MAX_COMMENTS_COUNT
    });

    if (!record) {
      throw new NotFoundException(`Comment with id ${id} not found.`);
    }

    return this.createEntityFromDocument(record);
  }
}
