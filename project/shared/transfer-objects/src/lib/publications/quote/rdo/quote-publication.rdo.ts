import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../../publication-tags';
import { PROPERTY } from '../../publication.constant';

export class QuotePublicationRDO {
  @ApiProperty(PROPERTY.PUBLICATION_ID)
  @Expose()
  id: string;

  @ApiProperty(PROPERTY.QUOTE_TYPE)
  @Expose()
  type: string;

  @ApiProperty(PROPERTY.LIKES)
  @Expose()
  likes: number;

  @ApiProperty(PROPERTY.COMMENTS)
  @Expose()
  comments: number;

  @ApiProperty(PROPERTY.PUBLISHED_AT)
  @Expose()
  publishedAt: Date;

  @ApiProperty(PROPERTY.OWNER_ID)
  @Expose()
  currentOwnerId: string;

  @ApiProperty(PROPERTY.AUTHOR)
  @Expose()
  author: string;

  @ApiProperty(PROPERTY.QUOTE_TEXT)
  @Expose()
  text: string;

  @ApiProperty(PROPERTY.TAGS)
  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];
}
