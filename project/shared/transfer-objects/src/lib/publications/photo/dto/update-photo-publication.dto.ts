import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, Validate } from 'class-validator';

import { TagTitleValidator } from '@project/shared/core';

import { PROPERTY } from '../../publication.constant';

export class UpdatePhotoPublicationDTO {
  @ApiProperty(PROPERTY.PHOTO)
  @IsOptional()
  @IsString()
  photo?: string;

  @ApiProperty(PROPERTY.TAGS)
  @IsOptional()
  @Validate(TagTitleValidator, {
    each: true
  })
  tags?: string[];

  userId: string;
}
