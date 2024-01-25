import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../../publication.constant';
import { ArrayNotEmpty, IsArray, IsOptional, IsString, IsUrl, MaxLength, Validate } from 'class-validator';
import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from '@project/shared/core';

export class CreateLinkPublicationDTO {
  userId: string;

  @ApiProperty(PROPERTY.URL)
  @IsUrl()
  url: string;

  @ApiProperty(PROPERTY.DESCRIPTION)
  @IsString()
  @MaxLength(300)
  description: string;

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
