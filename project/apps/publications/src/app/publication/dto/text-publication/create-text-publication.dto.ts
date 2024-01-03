import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoin.constant';

export class CreateTextPublicationDto {
  @ApiProperty(PROPERTY.OWNER_ID)
  ownerId: string;
  @ApiProperty(PROPERTY.NAME)
  name: string;
  @ApiProperty(PROPERTY.ANNOUNCEMENT)
  announcement: string;
  @ApiProperty(PROPERTY.TEXT)
  text: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
