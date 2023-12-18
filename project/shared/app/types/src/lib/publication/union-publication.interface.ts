import { LinkPublication } from './link-publication.interface';
import { PhotoPublication } from './photo-publication.interface';
import { VideoPublication } from './video-publication.interface';
import { TextPublication } from './text-publication.interface';
import { QuotePublication } from './quote-publication.interface';

export type UnionPublication =
  | LinkPublication
  | PhotoPublication
  | VideoPublication
  | TextPublication
  | QuotePublication;
