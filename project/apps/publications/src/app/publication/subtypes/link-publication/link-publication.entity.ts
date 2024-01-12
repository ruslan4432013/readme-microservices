import { BasePublication, LinkPublication, PublicationType } from "@project/shared/app/types";

import { PublicationEntity } from "../../publication.entity";

export class LinkPublicationEntity extends PublicationEntity<LinkPublication> {
  public url: string;
  public description: string;
  public type: PublicationType.Link


  protected populate(data: LinkPublication) {
    super.populate(data)
    this.url = data.url
    this.description = data.description
  }

  protected getPojo(): Omit<LinkPublication, keyof BasePublication> {
    return {
      url: this.url,
      description: this.description
    }
  }

  static fromObject(data: LinkPublication): LinkPublicationEntity {
    return new LinkPublicationEntity(data)
  }
}
