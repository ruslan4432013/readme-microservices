import { Expose } from 'class-transformer';

export class CommentRDO {
  @Expose()
  public publicationId: string;

  @Expose()
  public id: string;

  @Expose()
  public message: string;

  @Expose()
  public userId: string;

  @Expose()
  public createdAt: Date;
}
