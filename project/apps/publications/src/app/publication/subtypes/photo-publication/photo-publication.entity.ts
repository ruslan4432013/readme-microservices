import { BasePublication, PhotoPublication, PublicationType } from "@project/shared/app/types";

import { PublicationEntity } from "../../publication.entity";

export class PhotoPublicationEntity extends PublicationEntity<PhotoPublication> {
  public photo: string;
  public type: PublicationType.Photo

  protected populate(data: PhotoPublication) {
    super.populate(data)
    this.photo = data.photo
  }

  protected getPojo(): Omit<PhotoPublication, keyof BasePublication> {
    return {
      photo: this.photo
    };
  }

  static fromObject(data: PhotoPublication): PhotoPublicationEntity {
    return new PhotoPublicationEntity(data)
  }
}
