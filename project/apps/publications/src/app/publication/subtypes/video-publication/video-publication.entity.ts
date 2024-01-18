import { BasePublication, PublicationType, VideoPublication } from "@project/shared/app/types";

import { PublicationEntity } from "../../publication.entity";

export class VideoPublicationEntity extends PublicationEntity<VideoPublication> {
  public name: string;
  public link: string;
  public type: PublicationType.Video

  protected populate(data: VideoPublication) {
    super.populate(data)
    this.name = data.name
    this.link = data.link
  }

  protected getPojo(): Omit<VideoPublication, keyof BasePublication> {
    return {
      link: this.link,
      name: this.name
    };
  }

  static fromObject(data: VideoPublication): VideoPublicationEntity {
    return new VideoPublicationEntity(data)
  }
}
