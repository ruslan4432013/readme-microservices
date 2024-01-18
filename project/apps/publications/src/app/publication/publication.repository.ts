import { BasePostgresRepository } from "@project/shared/core";
import {
  BasePublication,
  PaginationResult,
  PublicationStatus,
  PublicationType,
} from "@project/shared/app/types";
import { BadRequestException, Injectable } from "@nestjs/common";
import { PrismaClientService } from "@project/shared/publications/models";
import { PublicationEntity } from "./publication.entity";
import { Prisma } from "@prisma/client";
import { PublicationQuery } from "./query/publication.query";
import { DEFAULT, SORT_MAP } from "./publication.constant";


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

  public async findById(id: PublicationEntity["id"]): Promise<PublicationEntity | null> {
    const document = await this.client.publication.findFirst({
      where: {
        id
      }
    })
    if (!document) {
      throw new BadRequestException(`Publication with id ${id} not found`)
    }
    return PublicationEntity.fromObject({
      ...document,
      status: document.status as PublicationStatus,
      type: document.type as PublicationType
    })
  }

  public async find(query?: PublicationQuery): Promise<PaginationResult<PublicationEntity>> {
    const skip = query?.page && query?.limit ? (query.page - 1) * query.limit : undefined;
    const take = query?.limit || DEFAULT.PUBLICATION_COUNT_LIMIT;
    const where: Prisma.PublicationWhereInput = {};
    let orderBy: Prisma.PublicationOrderByWithRelationInput = {};

    if (query?.sort) {
      orderBy = SORT_MAP[query.sort]
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
        },
      }),
      this.getPublicationsCount(where),
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
      totalItems: publicationCount,
    }
  }
}
