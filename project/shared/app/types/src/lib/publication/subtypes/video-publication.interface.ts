import { BasePublication } from "../base-publication.interface";
import { PublicationType } from "../publication-type.enum";

export interface VideoPublication extends BasePublication {
  name: string
  link: string
  type: PublicationType.Video
}
