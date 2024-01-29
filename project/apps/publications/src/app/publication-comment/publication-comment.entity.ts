import { Comment } from '@project/shared/app/types';
import { Entity } from '@project/shared/core';
import { CreateCommentDTO } from '@project/shared/transfer-objects';

export class PublicationCommentEntity implements Comment, Entity<string, Comment> {
  public id?: string;
  public createdAt: Date;
  public updatedAt: Date;
  public publicationId: string;
  public message: string;
  public userId: string;

  public populate(data: Comment): PublicationCommentEntity {
    this.id = data.id;
    this.createdAt = data.createdAt;
    this.message = data.message;
    this.publicationId = data.publicationId;
    this.updatedAt = data.updatedAt;
    this.userId = data.userId;

    return this;
  }

  public toPOJO(): Comment {
    return {
      id: this.id,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
      publicationId: this.publicationId,
      message: this.message,
      userId: this.userId
    };
  }

  static fromObject(data: Comment): PublicationCommentEntity {
    return new PublicationCommentEntity()
      .populate(data);
  }

  static fromDTO(dto: CreateCommentDTO, publicationId: string): PublicationCommentEntity {
    return new PublicationCommentEntity()
      .populate({
        ...dto,
        publicationId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
  }
}
