import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { BasePublication, PaginationResult, PublicationStatus, PublicationType } from '@project/shared/app/types';
import { BasePostgresRepository } from '@project/shared/core';
import { PrismaClientService } from '@project/shared/publications/models';
import { LikeDTO, UpdateBasePublicationDTO } from '@project/shared/transfer-objects';

import {
  DEFAULT,
  PUBLICATION_SEARCH_QUERY,
  PUBLICATION_SEARCH_WHERE_OR,
  SORT_MAP
} from './publication.constant';
import { PublicationEntity } from './publication.entity';
import { createPublication, mapPrismaPublication } from './publication.helper';
import { PublicationEntitySubtypes } from './publication.types';
import { FindPublicationQuery } from './query/find-publication.query';
import { NotifyPublicationQuery } from './query/notify-publication.query';
import { PublicationQuery } from './query/publication.query';


@Injectable()
export class PublicationRepository extends BasePostgresRepository<
  PublicationEntity,
  BasePublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationEntity.fromObject);
  }

  private async getPublicationsCount(where: Prisma.PublicationWhereInput): Promise<number> {
    return this.client.publication.count({ where });
  }

  private calculatePublicationsPage(totalCount: number, limit: number): number {
    return Math.ceil(totalCount / limit);
  }

  public async findNewPublications(query: NotifyPublicationQuery) {
    const publication = await this.client.publication.findMany({
      where: {
        publishedAt: {
          gte: query.startDate
        }
      },
      include: {
        VideoPublication: true,
        TextPublication: true,
        QuotePublication: true,
        PhotoPublication: true,
        LinkPublication: true
      }
    });
    return publication;
  }

  public async findById(id: PublicationEntity['id']): Promise<PublicationEntity | null> {
    const document = await this.client.publication.findFirst({
      where: {
        id
      }
    });
    if (!document) {
      throw new BadRequestException(`Publication with id ${id} not found`);
    }
    return PublicationEntity.fromObject({
      ...document,
      status: document.status as PublicationStatus,
      type: document.type as PublicationType
    });
  }

  public async update(id: string, dto: Omit<UpdateBasePublicationDTO, 'userId'>): Promise<PublicationEntity> {
    const document = await this.client.publication.update({
      where: {
        id
      },
      data: {
        ...dto
      }
    });

    return PublicationEntity.fromObject({
      ...document,
      status: document.status as PublicationStatus,
      type: document.type as PublicationType
    });
  }

  public async search(query: FindPublicationQuery): Promise<PublicationEntitySubtypes[]> {
    if (!query.search) {
      const publications = await this.client.publication.findMany({
        ...PUBLICATION_SEARCH_QUERY,
        where: {
          status: PublicationStatus.Published
        }
      });
      return publications.map(mapPrismaPublication);
    }

    const search = query.search.toLowerCase();

    const publications = await this.client.publication.findMany({
      ...PUBLICATION_SEARCH_QUERY,
      where: {
        status: PublicationStatus.Published,
        OR: PUBLICATION_SEARCH_WHERE_OR(search)
      }
    });

    return publications.map(mapPrismaPublication);
  }


  public async find(query?: PublicationQuery, hasDraft?: boolean): Promise<PaginationResult<PublicationEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit || DEFAULT.PUBLICATION_COUNT_LIMIT;
    const where: Prisma.PublicationWhereInput = {};
    let orderBy: Prisma.PublicationOrderByWithRelationInput = {};

    if (query?.tags && query.tags.length > 0) {
      where.tags = {
        some: {
          OR: query.tags.map((title) => ({ title }))
        }
      };
    }

    if (query?.sort) {
      orderBy = SORT_MAP[query.sort];
    }

    if (query?.userId) {
      where.currentOwnerId = query.userId;
    }

    if (query?.type) {
      where.type = query.type;
    }

    if (!hasDraft) {
      where.status = PublicationStatus.Published;
    }

    const [records, publicationCount] = await Promise.all([
      this.client.publication.findMany({
        where, orderBy, skip, take,
        include: {
          tags: true,
          _count: {
            select: {
              comments: true,
              like: true
            }
          }
        }
      }),
      this.getPublicationsCount(where)
    ]);

    return {
      entities: records.map((record) => this.createEntityFromDocument({
        ...record,
        status: record.status as PublicationStatus,
        type: record.type as PublicationType,
        comments: record._count.comments,
        likes: record._count.like
      })),
      currentPage: query?.page || 1,
      totalPages: this.calculatePublicationsPage(publicationCount, take),
      itemsPerPage: take || DEFAULT.PUBLICATION_COUNT_LIMIT,
      totalItems: publicationCount
    };
  }

  public async getUserPublicationCount(userId: string): Promise<number> {
    return this.client.publication.count({
      where: {
        currentOwnerId: userId
      }
    });
  }

  public async repost(publicationId: string, userId: string) {
    const publication = await this.client.publication.findFirst({
      where: {
        id: publicationId
      },
      include: {
        tags: true,
        LinkPublication: true,
        PhotoPublication: true,
        QuotePublication: true,
        TextPublication: true,
        VideoPublication: true
      }
    });
    if (!publication) {
      throw new BadRequestException(`Publication with id ${publicationId} doesn't exist`);
    }

    const { PhotoPublication, QuotePublication, LinkPublication, VideoPublication, TextPublication } = publication;

    return this.client.publication.create({
      data: {
        originalOwnerId: publication.originalOwnerId,
        currentOwnerId: userId,
        tags: {
          connect: publication?.tags.map(el => ({ id: el.id })) || []
        },
        type: publication.type,
        ...createPublication('PhotoPublication', PhotoPublication),
        ...createPublication('QuotePublication', QuotePublication),
        ...createPublication('LinkPublication', LinkPublication),
        ...createPublication('VideoPublication', VideoPublication),
        ...createPublication('TextPublication', TextPublication),
        comments: {
          connect: []
        },
        sourceId: publicationId,
        like: {
          connect: []
        },
        isReposted: true,
        status: PublicationStatus.Published,
        publishedAt: new Date()
      }
    });
  }

  public async getLike({ publicationId, userId }: LikeDTO) {
    return this.client.like.findFirst({
      where: {
        publicationId,
        userId
      }
    });
  }

  public async like({ publicationId, userId }: LikeDTO) {
    return this.client.like.create({
      data: {
        publicationId,
        userId
      }
    });
  }

  public async dislike({ publicationId, userId }: LikeDTO) {
    return this.client.like.deleteMany({
      where: {
        publicationId,
        userId
      }
    });
  }
}
