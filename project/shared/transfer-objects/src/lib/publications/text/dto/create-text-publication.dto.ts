import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString, Length,
  Validate
} from 'class-validator';

import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from '@project/shared/core';

import { PROPERTY } from '../../publication.constant';

export class CreateTextPublicationDTO {

  userId: string;

  @ApiProperty(PROPERTY.NAME)
  @IsString()
  @Length(PROPERTY.NAME.minimum, PROPERTY.NAME.maximum)
  name: string;

  @ApiProperty(PROPERTY.ANNOUNCEMENT)
  @IsString()
  @Length(PROPERTY.ANNOUNCEMENT.minimum, PROPERTY.ANNOUNCEMENT.maximum)
  announcement: string;

  @ApiProperty(PROPERTY.TEXT)
  @IsString()
  @Length(PROPERTY.TEXT.minimum, PROPERTY.TEXT.maximum)
  text: string;

  @ApiProperty(PROPERTY.TAGS)
  @IsOptional()
  @IsArray()
  @ArrayNotEmpty()
  @Validate(PublicationTagsValidator, {
    message: `Tags must be lower than ${PUBLICATION.TAGS.MAX}`
  })
  @Validate(TagTitleValidator, {
    each: true
  })
  tags?: string[];
}
