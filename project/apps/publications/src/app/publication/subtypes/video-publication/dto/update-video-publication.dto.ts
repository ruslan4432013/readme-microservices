import { ApiProperty } from '@nestjs/swagger';
import { ALLOWED_HOSTS, MESSAGES, PROPERTY } from '../../../publication.constant';
import { IsMongoId, IsOptional, IsString, IsUrl, Length, Validate } from "class-validator";
import { TagTitleValidator } from "@project/shared/core";

export class UpdateVideoPublicationDTO {
  @ApiProperty(PROPERTY.NAME)
  @IsOptional()
  @IsString()
  @Length(PROPERTY.NAME.minimum, PROPERTY.NAME.maximum)
  name?: string;

  @ApiProperty(PROPERTY.VIDEO_LINK)
  @IsOptional()
  @IsUrl(
    { host_whitelist: ALLOWED_HOSTS },
    { message: MESSAGES.WRONG_LINK }
  )
  link?: string;

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
