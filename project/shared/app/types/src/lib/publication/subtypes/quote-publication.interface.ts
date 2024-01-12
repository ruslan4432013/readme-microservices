import { BasePublication } from "../base-publication.interface";
import { PublicationType } from "../publication-type.enum";

export interface QuotePublication extends BasePublication {
  text: string,
  author: string
  type: PublicationType.Quote
}
