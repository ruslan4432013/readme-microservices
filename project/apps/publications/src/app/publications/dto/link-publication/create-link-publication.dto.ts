import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class CreateLinkPublicationDto {
  @ApiProperty(PROPERTY.OWNER_ID)
  ownerId: string;
  @ApiProperty(PROPERTY.LINK)
  link: string;
  @ApiProperty(PROPERTY.DESCRIPTION)
  description: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
