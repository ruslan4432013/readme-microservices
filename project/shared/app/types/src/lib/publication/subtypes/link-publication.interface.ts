import { BasePublication } from "../base-publication.interface";
import { PublicationType } from "../publication-type.enum";

export interface LinkPublication extends BasePublication {
  url: string;
  description: string;
  type: PublicationType.Link
}
