import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class UpdatePhotoPublicationDto {
  @ApiProperty(PROPERTY.PHOTO)
  photo?: string
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[]
}
