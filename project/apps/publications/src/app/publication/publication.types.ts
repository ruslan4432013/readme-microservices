import { VideoPublicationEntity } from "./subtypes/video-publication/video-publication.entity";
import { QuotePublicationEntity } from "./subtypes/quote-publication/quote-publication.entity";
import { TextPublicationEntity } from "./subtypes/text-publication/text-publication.entity";
import { PhotoPublicationEntity } from "./subtypes/photo-publication/photo-publication.entity";
import { LinkPublicationEntity } from "./subtypes/link-publication/link-publication.entity";
import { LinkPublicationRdo } from "./subtypes/link-publication/rdo";
import { QuotePublicationRdo } from "./subtypes/quote-publication/rdo";
import { TextPublicationRdo } from "./subtypes/text-publication/rdo";
import { PhotoPublicationRdo } from "./subtypes/photo-publication/rdo";
import { VideoPublicationRdo } from "./subtypes/video-publication/rdo";

export type PublicationEntitySubtypes =
  | VideoPublicationEntity
  | QuotePublicationEntity
  | TextPublicationEntity
  | PhotoPublicationEntity
  | LinkPublicationEntity


export type PublicationsRdo =
  | LinkPublicationRdo
  | QuotePublicationRdo
  | TextPublicationRdo
  | PhotoPublicationRdo
  | VideoPublicationRdo
