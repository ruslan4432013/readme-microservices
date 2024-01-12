import { BasePostgresRepository } from '@project/shared/core';
import { PublicationTagEntity } from './publication-tag.entity';
import { Tag } from '@project/shared/app/types';
import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaClientService } from '@project/shared/publications/models';
import { MAX_TAG_LIMIT } from "./publication-tag.constant";
import { CategoryFilter, tagFilterToPrismaFilter } from "./publication-tag.filter";

@Injectable()
export class PublicationTagRepository extends BasePostgresRepository<
  PublicationTagEntity,
  Tag
> {
  constructor(protected readonly client: PrismaClientService) {
    super(client, PublicationTagEntity.fromObject);
  }

  public async save(entity: PublicationTagEntity): Promise<PublicationTagEntity> {
    const record = await this.client.tag.create({
      data: { ...entity.toPOJO() },
    });
    entity.id = record.id

    return entity
  }

  public async findById(id: PublicationTagEntity["id"]): Promise<PublicationTagEntity | null> {
    const document = await this.client.tag.findFirst({
      where: {
        id
      }
    })
    if (!document) {
      throw new NotFoundException(`Tag with id ${id} not found.`);
    }
    return this.createEntityFromDocument(document)
  }

  public async find(filter?: CategoryFilter): Promise<PublicationTagEntity[]> {
    const where = filter && tagFilterToPrismaFilter(filter);

    const documents = await this.client.tag.findMany({
      where,
      take: MAX_TAG_LIMIT
    });

    return documents.map((document) => this.createEntityFromDocument(document));
  }


  public async deleteById(id: string): Promise<void> {
    await this.client.tag.delete({
      where: {
        id,
      }
    });
  }

  public async update(id: string, entity: PublicationTagEntity): Promise<PublicationTagEntity> {
    const updatedTag = await this.client.tag.update({
      where: { id },
      data: {
        title: entity.title,
      }
    });

    return this.createEntityFromDocument(updatedTag);
  }
}
