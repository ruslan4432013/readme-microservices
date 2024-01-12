import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { PUBLICATION } from "./publication.constant";

@ValidatorConstraint()
export class PublicationTagsValidator implements ValidatorConstraintInterface {
  public validate(tags: string[]) {
    return new Set(tags.map(tag => tag.toLowerCase())).size <= PUBLICATION.TAGS.MAX
  }
}

