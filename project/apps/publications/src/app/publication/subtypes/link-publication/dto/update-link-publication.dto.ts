import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../../publication.constant';
import { IsOptional, IsString, IsUrl, MaxLength } from "class-validator";

export class UpdateLinkPublicationDto {
  @ApiProperty(PROPERTY.URL)
  @IsUrl()
  url?: string;

  @ApiProperty(PROPERTY.DESCRIPTION)
  @IsOptional()
  @IsString()
  @MaxLength(300)
  description?: string;

  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
