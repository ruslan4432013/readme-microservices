import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoin.constant';

export class UpdateVideoPublicationDto {
  @ApiProperty(PROPERTY.NAME)
  name?: string;
  @ApiProperty(PROPERTY.VIDEO_LINK)
  link?: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
