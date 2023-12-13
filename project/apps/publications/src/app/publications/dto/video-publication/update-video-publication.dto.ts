import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class UpdateVideoPublicationDto {
  @ApiProperty(PROPERTY.NAME)
  name?: string;
  @ApiProperty(PROPERTY.VIDEO_LINK)
  link?: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
