import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../../publication-tags';

export class PublicationRDO {
  @Expose()
  id: string;

  @Expose()
  type: string;

  @Expose()
  likes: number;

  @Expose()
  comments: number;

  @Expose()
  publishedAt: Date;

  @Expose()
  currentOwnerId: string;

  @Expose()
  link: string;

  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];

  @Expose()
  name: string;

}
