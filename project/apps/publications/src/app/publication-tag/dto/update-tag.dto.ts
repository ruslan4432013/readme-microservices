import { ApiProperty } from '@nestjs/swagger';
import { PROPERTY } from '../publication-tag.constant';
import { IsString, Validate } from "class-validator";
import { TagTitleValidator } from "@project/shared/core";

export class UpdateTagDto {
  @ApiProperty(PROPERTY.TITLE)
  @IsString()
  @Validate(TagTitleValidator, {
    message: 'Wrong tag title',
  })
  public title: string;
}
