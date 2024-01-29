import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl, MaxLength } from 'class-validator';

import { PROPERTY } from '../../publication.constant';

export class UpdateLinkPublicationDTO {
  userId: string;

  @ApiProperty(PROPERTY.URL)
  @IsOptional()
  @IsUrl()
  url?: string;

  @ApiProperty(PROPERTY.DESCRIPTION)
  @IsOptional()
  @IsString()
  @MaxLength(PROPERTY.DESCRIPTION.maximum)
  description?: string;

  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
