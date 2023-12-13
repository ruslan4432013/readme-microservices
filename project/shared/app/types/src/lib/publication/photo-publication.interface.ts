import { Publication } from './publication.interface';
import { PublicationType } from './publication-type.enum';

export interface PhotoPublication extends Publication {
  photo: string
  type: PublicationType.Photo
}
