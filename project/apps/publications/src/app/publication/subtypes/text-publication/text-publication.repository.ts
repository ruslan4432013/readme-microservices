import { BasePostgresRepository } from "@project/shared/core";
import { TextPublicationEntity } from "./text-publication.entity";
import { PublicationStatus, PublicationType, TextPublication } from "@project/shared/app/types";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClientService } from "@project/shared/publications/models";
import { PUBLICATION_QUERY } from "../../publication.constant";


@Injectable()
export class TextPublicationRepository extends BasePostgresRepository<
  TextPublicationEntity,
  TextPublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, TextPublicationEntity.fromObject);
  }

  public async save(entity: TextPublicationEntity): Promise<TextPublicationEntity> {
    const { text, name, announcement, tags, ...publication } = entity
    const document = await this.client.textPublication.create({
      include: PUBLICATION_QUERY.INCLUDE,
      data: {
        text,
        name,
        announcement,
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
              connect: [],
            }
          }
        }
      }
    })
    return this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Text,
      status: document.publication.status as PublicationStatus
    })
  }

  public async findById(id: TextPublicationEntity["id"]): Promise<TextPublicationEntity> {
    const document = await this.client.textPublication.findFirst({
      where: {
        publicationId: id
      },
      include: PUBLICATION_QUERY.INCLUDE,
    })

    if (!document) {
      throw new NotFoundException(`Text Publication with id ${id} not found.`);
    }
    const entity = this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Text,
      status: document.publication.status as PublicationStatus
    })
    return entity
  }

  public async update(id: TextPublicationEntity["id"], entity: TextPublicationEntity): Promise<TextPublicationEntity> {
    const pojoDocument = entity.toPOJO()
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
      },
    });

    const document = await this.client.textPublication.update({
      where: {
        publicationId: id
      },
      data: {
        text: pojoDocument.text,
        name: pojoDocument.name,
        announcement: pojoDocument.announcement,
      },
      include: PUBLICATION_QUERY.INCLUDE
    })
    return this.createEntityFromDocument({
      ...document,
      ...document.publication,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Text,
      status: document.publication.status as PublicationStatus
    });
  }

  public async deleteById(id: TextPublicationEntity["id"]): Promise<void> {
    await this.client.publication.delete({
      where: {
        id
      }
    })
  }
}
