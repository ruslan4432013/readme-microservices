import { ArrayNotEmpty, IsArray, Validate } from "class-validator";
import { TagTitleValidator } from "@project/shared/core";

export class CreateTagsDTO {
  @IsArray()
  @ArrayNotEmpty()
  @Validate(TagTitleValidator, {
    message: 'Wrong tag title',
    each: true
  })
  public titles: string[];
}
