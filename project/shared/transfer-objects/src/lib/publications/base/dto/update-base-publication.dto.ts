import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEnum, IsOptional } from 'class-validator';

import { PublicationStatus } from '@project/shared/app/types';

import { PROPERTY } from '../../publication.constant';

export class UpdateBasePublicationDTO {

  @ApiProperty(PROPERTY.PUBLISHED_AT)
  @IsOptional()
  @IsDate()
  publishedAt?: Date | null;

  @ApiProperty(PROPERTY.STATUS)
  @IsOptional()
  @IsEnum(PublicationStatus)
  status?: PublicationStatus;

  userId: string;
}
