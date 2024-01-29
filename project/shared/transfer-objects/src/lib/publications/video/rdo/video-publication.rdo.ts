import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../../publication-tags';
import { PROPERTY } from '../../publication.constant';

export class VideoPublicationRDO {
  @ApiProperty(PROPERTY.PUBLICATION_ID)
  @Expose()
  id: string;

  @ApiProperty(PROPERTY.VIDEO_TYPE)
  @Expose()
  type: string;

  @ApiProperty(PROPERTY.LIKES)
  @Expose()
  likes: number;

  @ApiProperty(PROPERTY.COMMENTS)
  @Expose()
  comments: number;

  @ApiProperty(PROPERTY.COMMENTS)
  @Expose()
  publishedAt: Date;

  @ApiProperty(PROPERTY.COMMENTS)
  @Expose()
  currentOwnerId: string;

  @ApiProperty(PROPERTY.VIDEO_LINK)
  @Expose()
  link: string;

  @ApiProperty(PROPERTY.TAGS)
  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];

  @ApiProperty(PROPERTY.NAME)
  @Expose()
  name: string;

}
