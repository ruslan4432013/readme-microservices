import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoin.constant';

export class UpdateQuotePublicationDto {
  @ApiProperty(PROPERTY.NAME)
  name?: string;
  @ApiProperty(PROPERTY.AUTHOR)
  author?: string;
  @ApiProperty(PROPERTY.QUOTE_TEXT)
  text: string;
  @ApiProperty(PROPERTY.TEXT)
  tags?: string[];
}
