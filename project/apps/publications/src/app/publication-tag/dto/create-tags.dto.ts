import { ArrayNotEmpty, IsArray, Validate } from 'class-validator';

import { TagTitleValidator } from '@project/shared/core';

import { ERROR_MESSAGES } from '../publication-tag.constant';

export class CreateTagsDTO {
  @IsArray()
  @ArrayNotEmpty()
  @Validate(TagTitleValidator, {
    message: ERROR_MESSAGES.WRONG_TAG_TITLE,
    each: true
  })
  public titles: string[];
}
