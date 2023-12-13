import { Publication } from './publication.interface';
import { PublicationType } from './publication-type.enum';

export interface QuotePublication extends Publication {
  text: string,
  author: string
  type: PublicationType.Quote
}
