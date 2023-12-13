import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../../publicatoins.constant';

export class CreatePhotoPublicationDto {
  @ApiProperty(PROPERTY.OWNER_ID)
  ownerId: string;
  @ApiProperty(PROPERTY.PHOTO)
  photo: string;
  @ApiProperty(PROPERTY.TAGS)
  tags?: string[];
}
