import { LinkPublicationRDO } from './link';
import { PhotoPublicationRDO } from './photo';
import { QuotePublicationRDO } from './quote';
import { TextPublicationRDO } from './text';
import { VideoPublicationRDO } from './video';

export * from './link';
export * from './photo';
export * from './quote';
export * from './text';
export * from './video';
export * from './base';


export type PublicationsRDO =
  | LinkPublicationRDO
  | QuotePublicationRDO
  | TextPublicationRDO
  | PhotoPublicationRDO
  | VideoPublicationRDO
