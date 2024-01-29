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

export class CreateQuotePublicationDTO {
  @ApiProperty(PROPERTY.AUTHOR)
  @IsString()
  @Length(PROPERTY.AUTHOR.minimum, PROPERTY.AUTHOR.maximum)
  author: string;

  @ApiProperty(PROPERTY.QUOTE_TEXT)
  @IsString()
  @Length(PROPERTY.QUOTE_TEXT.minimum, PROPERTY.QUOTE_TEXT.maximum)
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

  userId: string;
}
