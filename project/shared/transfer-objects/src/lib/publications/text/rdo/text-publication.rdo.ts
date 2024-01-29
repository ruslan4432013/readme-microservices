import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../../publication-tags';
import { PROPERTY } from '../../publication.constant';

export class TextPublicationRDO {
  @ApiProperty(PROPERTY.PUBLICATION_ID)
  @Expose()
  id: string;

  @ApiProperty(PROPERTY.TEXT_TYPE)
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

  @ApiProperty(PROPERTY.NAME)
  @Expose()
  name: string;

  @ApiProperty(PROPERTY.ANNOUNCEMENT)
  @Expose()
  announcement: string;

  @ApiProperty(PROPERTY.TEXT)
  @Expose()
  text: string;

  @ApiProperty(PROPERTY.TAGS)
  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];
}
