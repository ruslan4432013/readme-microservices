import { Transform } from 'class-transformer';
import { IsOptional, Validate } from 'class-validator';
import { HasMimeType, IsFile, MaxFileSize, MemoryStoredFile } from 'nestjs-form-data';

import { TagTitleValidator } from '@project/shared/core';

import { ALLOWED_MIME_TYPES, MAX_PHOTO_PUBLICATION_SIZE } from '../../application.constant';

export class PhotoFormDataDTO {
  @IsFile()
  @MaxFileSize(MAX_PHOTO_PUBLICATION_SIZE)
  @HasMimeType(ALLOWED_MIME_TYPES)
  file: MemoryStoredFile;

  @Transform(({ value }) => value.split(','))
  @IsOptional()
  @Validate(TagTitleValidator, {
    each: true
  })
  tags?: string[];

  userId: string;
}
