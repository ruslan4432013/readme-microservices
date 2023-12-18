import { Publication } from './publication.interface';
import { PublicationType } from './publication-type.enum';

export interface LinkPublication extends Publication {
  url: string;
  description: string;
  type: PublicationType.Link
}
