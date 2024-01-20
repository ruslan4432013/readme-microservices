import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../../publication.constant';
import { IsMongoId, IsOptional, IsString, Validate } from "class-validator";
import { TagTitleValidator } from "@project/shared/core";

export class UpdatePhotoPublicationDTO {
  @ApiProperty(PROPERTY.PHOTO)
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty(PROPERTY.TAGS)
  @IsOptional()
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
