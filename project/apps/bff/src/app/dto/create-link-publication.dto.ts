import { ArrayNotEmpty, IsArray, IsOptional, IsString, IsUrl, MaxLength, Validate } from "class-validator";
import { PUBLICATION, PublicationTagsValidator, TagTitleValidator } from "@project/shared/core";

export class CreateLinkPublicationDTO {
  @IsUrl()
  url: string;

  @IsString()
  @MaxLength(300)
  description: string;

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
