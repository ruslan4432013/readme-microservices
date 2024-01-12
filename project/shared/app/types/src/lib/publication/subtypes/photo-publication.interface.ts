import { BasePublication } from "../base-publication.interface";
import { PublicationType } from "../publication-type.enum";

export interface PhotoPublication extends BasePublication {
  photo: string
  type: PublicationType.Photo
}
