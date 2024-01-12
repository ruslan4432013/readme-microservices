import { BasePublication } from "../base-publication.interface";
import { PublicationType } from "../publication-type.enum";

export interface TextPublication extends BasePublication {
  name: string;
  announcement: string;
  text: string;
  type: PublicationType.Text
}
