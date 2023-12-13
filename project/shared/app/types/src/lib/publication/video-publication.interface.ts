import { Publication } from './publication.interface';
import { PublicationType } from './publication-type.enum';

export interface VideoPublication extends Publication {
  name: string
  link: string
  type: PublicationType.Video
}
