import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoin.constant';

export class CreateQuotePublicationDto {
  @ApiProperty(PROPERTY.OWNER_ID)
  ownerId: string;
  @ApiProperty(PROPERTY.NAME)
  name: string;
  @ApiProperty(PROPERTY.AUTHOR)
  author: string;
  @ApiProperty(PROPERTY.QUOTE_TEXT)
  text: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
