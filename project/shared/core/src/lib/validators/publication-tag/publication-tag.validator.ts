import { ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";

import { PUBLICATION_TAG } from "./publication-tag.constant";

@ValidatorConstraint()
export class TagTitleValidator implements ValidatorConstraintInterface {
  public validate(text: string) {
    if (text.length < PUBLICATION_TAG.TITLE.MIN) {
      return false;
    }

    if (text.length > PUBLICATION_TAG.TITLE.MAX) {
      return false;
    }

    if (!/^[a-zA-Z]/.test(text)) {
      return false;
    }

    if (/\s/.test(text)) {
      return false;
    }

    if (!/^[a-zA-Z0-9]+$/.test(text)) {
      return false;
    }

    return true;
  }
}

