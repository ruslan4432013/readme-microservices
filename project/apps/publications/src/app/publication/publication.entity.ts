import { BasePublication, PublicationStatus, PublicationType } from '@project/shared/app/types';
import { Entity, EntityIdType } from '@project/shared/core';

import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';


export class PublicationEntity<Publication extends BasePublication = BasePublication> implements BasePublication, Entity<EntityIdType, Publication> {

  public id?: string;
  public tags: PublicationTagEntity[];
  public status: PublicationStatus;
  public publishedAt?: Date | null;
  public createdAt: Date;
  public updatedAt?: Date;
  public isReposted: boolean;
  public currentOwnerId: string;
  public originalOwnerId: string;
  public sourceId: string;
  public type: PublicationType;
  public likes?: number;
  public comments?: number;

  constructor(data: Publication) {
    this.populate(data);
  }

  protected populate(data: Publication) {
    this.id = data.id;
    this.tags = (data.tags || []).map(tag => PublicationTagEntity.fromObject(tag));
    this.type = data.type;
    this.publishedAt = data.publishedAt;
    this.currentOwnerId = data.currentOwnerId;
    this.isReposted = data.isReposted;
    this.status = data.status;
    this.updatedAt = data.updatedAt;
    this.sourceId = data.sourceId;
    this.originalOwnerId = data.originalOwnerId;
    this.likes = data.likes ?? 0;
    this.comments = data.comments ?? 0;
  }

  protected toBasePOJO(): BasePublication {
    return {
      id: this.id,
      tags: this.tags?.map(tag => tag.toPOJO()),
      type: this.type,
      likes: this.likes || 0,
      comments: this.comments || 0,
      publishedAt: this.publishedAt,
      createdAt: this.createdAt,
      currentOwnerId: this.currentOwnerId,
      isReposted: this.isReposted,
      status: this.status,
      updatedAt: this.updatedAt,
      sourceId: this.sourceId,
      originalOwnerId: this.originalOwnerId
    };
  }

  protected getPojo(): Omit<Publication, keyof BasePublication> {
    return {} as Omit<Publication, keyof BasePublication>;
  }

  public toPOJO(): Publication {
    const base = this.toBasePOJO();
    const extensional = this.getPojo();
    return {
      ...base,
      ...extensional
    } as Publication;
  }

  static fromObject(data: BasePublication): PublicationEntity {
    return new PublicationEntity(data);
  }
}
