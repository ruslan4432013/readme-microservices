import { ApiProperty } from '@nestjs/swagger';
import {
  ArrayNotEmpty,
  IsArray,
  IsOptional,
  IsString,
  Validate
} from 'class-validator';

import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from '@project/shared/core';

import { PROPERTY } from '../../publication.constant';

export class CreatePhotoPublicationDTO {
  @ApiProperty(PROPERTY.NAME)
  @IsString()
  photo: string;

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

  userId: string;
}
