import { BasePublication, PublicationType, QuotePublication } from "@project/shared/app/types";

import { PublicationEntity } from "../../publication.entity";

export class QuotePublicationEntity extends PublicationEntity<QuotePublication> {
  public author: string;
  public text: string;
  public type: PublicationType.Quote

  protected populate(data: QuotePublication) {
    super.populate(data)
    this.text = data.text
    this.author = data.author
  }

  protected getPojo(): Omit<QuotePublication, keyof BasePublication> {
    return {
      text: this.text,
      author: this.author,
    };
  }

  static fromObject(data: QuotePublication): QuotePublicationEntity {
    return new QuotePublicationEntity(data)
  }
}
