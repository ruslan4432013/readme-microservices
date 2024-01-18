import { Tag } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';

export class PublicationTagEntity implements Tag, Entity<string, Tag> {
  public id?: string;
  public title: string;
  public createdAt?: Date;
  public updatedAt?: Date;

  constructor(data: Tag) {
    if (!data.title) {
      throw new Error('Category title is required');
    }

    this.populate(data);
  }

  public populate(data: Tag): void {
    this.id = data.id;
    this.title = data.title;
    this.updatedAt = data.updatedAt;
    this.createdAt = data.createdAt;
  }

  public toPOJO(): Tag {
    return {
      id: this.id,
      title: this.title,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    };
  }

  static fromObject(data: Tag): PublicationTagEntity {
    return new PublicationTagEntity(data)
  }
}
