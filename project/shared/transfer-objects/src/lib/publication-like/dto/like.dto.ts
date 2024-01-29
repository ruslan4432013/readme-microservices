import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

import { PROPERTY } from '../../publications/publication.constant';

export class LikeDTO {
  userId: string;

  @ApiProperty(PROPERTY.PUBLICATION_ID)
  @IsString()
  publicationId: string;
}
