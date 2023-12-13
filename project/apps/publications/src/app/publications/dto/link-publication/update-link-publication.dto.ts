import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class UpdateLinkPublicationDto {
  @ApiProperty(PROPERTY.LINK)
  link?: string;
  @ApiProperty(PROPERTY.DESCRIPTION)
  description?: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
