import { ApiProperty } from '@nestjs/swagger';
import { IsString, Validate } from "class-validator";

import { TagTitleValidator } from "@project/shared/core";

import { PROPERTY } from '../publication-tag.constant';

export class CreateTagDTO {
  @ApiProperty(PROPERTY.TITLE)
  @IsString()
  @Validate(TagTitleValidator, {
    message: 'Wrong tag title',
  })
  public title: string;
}
