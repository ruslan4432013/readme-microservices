import { Expose, Type } from 'class-transformer';

import { PublicationRDO } from './publication.rdo';

import { TagRdo } from '../../../publication-tags';

export class DetailPublicationRDO extends PublicationRDO {
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
