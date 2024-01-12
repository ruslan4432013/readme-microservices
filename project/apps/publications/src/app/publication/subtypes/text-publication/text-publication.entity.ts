import { BasePublication, PublicationType, TextPublication } from "@project/shared/app/types";

import { PublicationEntity } from "../../publication.entity";

export class TextPublicationEntity extends PublicationEntity<TextPublication> {
  public name: string;
  public announcement: string;
  public text: string;
  public type: PublicationType.Text

  protected populate(data: TextPublication) {
    super.populate(data)
    this.name = data.name
    this.text = data.text
    this.announcement = data.announcement
  }

  protected getPojo(): Omit<TextPublication, keyof BasePublication> {
    return {
      announcement: this.announcement,
      name: this.name,
      text: this.text
    };
  }

  static fromObject(data: TextPublication): TextPublicationEntity {
    return new TextPublicationEntity(data)
  }
}
