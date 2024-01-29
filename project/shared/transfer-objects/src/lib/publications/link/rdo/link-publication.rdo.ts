import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';

import { TagRdo } from '../../../publication-tags';
import { PROPERTY } from '../../publication.constant';


export class LinkPublicationRDO {
  @ApiProperty(PROPERTY.PUBLICATION_ID)
  @Expose()
  id: string;

  @ApiProperty(PROPERTY.LINK_TYPE)
  @Expose()
  type: string;


  @ApiProperty(PROPERTY.DESCRIPTION)
  @Expose()
  description: string;

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

  @ApiProperty(PROPERTY.URL)
  @Expose()
  url: string;

  @ApiProperty(PROPERTY.TAGS)
  @Expose()
  @Type(() => TagRdo)
  tags?: TagRdo[];

  @ApiProperty(PROPERTY.NAME)
  @Expose()
  name: string;
}
