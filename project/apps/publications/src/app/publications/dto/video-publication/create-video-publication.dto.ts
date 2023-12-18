import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class CreateVideoPublicationDto {
  @ApiProperty(PROPERTY.NAME)
  name: string;
  @ApiProperty(PROPERTY.VIDEO_LINK)
  link: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
  @ApiProperty(PROPERTY.OWNER_ID)
  ownerId: string;
}
