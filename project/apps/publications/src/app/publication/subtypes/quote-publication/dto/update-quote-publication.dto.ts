import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../../publication.constant';
import { ArrayNotEmpty, IsArray, IsMongoId, IsOptional, IsString, Length, Validate } from "class-validator";
import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from "@project/shared/core";

export class UpdateQuotePublicationDto {
  @ApiProperty(PROPERTY.AUTHOR)
  @IsOptional()
  @IsString()
  @Length(PROPERTY.AUTHOR.minimum, PROPERTY.AUTHOR.maximum)
  author?: string;

  @ApiProperty(PROPERTY.TEXT)
  @IsOptional()
  @IsString()
  @Length(PROPERTY.QUOTE_TEXT.minimum, PROPERTY.QUOTE_TEXT.maximum)
  text?: string;

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

  @ApiProperty(PROPERTY.OWNER_ID)
  @IsOptional()
  @IsString()
  @IsMongoId()
  ownerId?: string;
}
