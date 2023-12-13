import { Publication } from './publication.interface';
import { PublicationType } from './publication-type.enum';

export interface TextPublication extends Publication {
  name: string;
  announcement: string;
  text: string;
  type: PublicationType.Text
}
