import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from 'class-validator';

import { TagTitleValidator } from '@project/shared/core';

import { ERROR_MESSAGES, PROPERTY } from '../publication-tag.constant';

export class CreateTagDTO {
  @ApiProperty(PROPERTY.TITLE)
  @IsString()
  @Validate(TagTitleValidator, {
    message: ERROR_MESSAGES.WRONG_TAG_TITLE
  })
  public title: string;
}
