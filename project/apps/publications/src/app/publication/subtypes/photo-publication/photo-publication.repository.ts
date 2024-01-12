import { BasePostgresRepository } from "@project/shared/core";
import { PhotoPublicationEntity } from "./photo-publication.entity";
import { PhotoPublication, PublicationStatus, PublicationType } from "@project/shared/app/types";
import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaClientService } from "@project/shared/publications/models";
import { PUBLICATION_QUERY } from "../../publication.constant";


@Injectable()
export class PhotoPublicationRepository extends BasePostgresRepository<
  PhotoPublicationEntity,
  PhotoPublication
> {

  constructor(protected readonly client: PrismaClientService) {
    super(client, PhotoPublicationEntity.fromObject);
  }

  public async save(entity: PhotoPublicationEntity): Promise<PhotoPublicationEntity> {
    const { photo, tags, ...publication } = entity
    const document = await this.client.photoPublication.create({
      include: PUBLICATION_QUERY.INCLUDE,
      data: {
        photo,
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
      type: document.publication.type as PublicationType.Photo,
      status: document.publication.status as PublicationStatus
    })
  }

  public async findById(id: PhotoPublicationEntity["id"]): Promise<PhotoPublicationEntity> {
    const document = await this.client.photoPublication.findFirst({
      where: {
        publicationId: id
      },
      include: PUBLICATION_QUERY.INCLUDE,
    })

    if (!document) {
      throw new NotFoundException(`Photo Publication with id ${id} not found.`);
    }
    const entity = this.createEntityFromDocument({
      ...document.publication,
      ...document,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Photo,
      status: document.publication.status as PublicationStatus
    })
    return entity
  }

  public async update(id: PhotoPublicationEntity["id"], entity: PhotoPublicationEntity): Promise<PhotoPublicationEntity> {
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

    const document = await this.client.photoPublication.update({
      where: {
        publicationId: id
      },
      data: {
        photo: pojoDocument.photo,
      },
      include: PUBLICATION_QUERY.INCLUDE
    })
    return this.createEntityFromDocument({
      ...document,
      ...document.publication,
      id: document.publication.id,
      likes: document.publication._count.like,
      comments: document.publication._count.comments,
      type: document.publication.type as PublicationType.Photo,
      status: document.publication.status as PublicationStatus
    });
  }

  public async deleteById(id: PhotoPublicationEntity["id"]): Promise<void> {
    await this.client.publication.delete({
      where: {
        id
      }
    })
  }
}
