import { PublicationType } from "@project/shared/app/types";
import { LinkPublicationRdo } from "./subtypes/link-publication/rdo";
import { QuotePublicationRdo } from "./subtypes/quote-publication/rdo";
import { TextPublicationRdo } from "./subtypes/text-publication/rdo";
import { PhotoPublicationRdo } from "./subtypes/photo-publication/rdo";
import { VideoPublicationRdo } from "./subtypes/video-publication/rdo";
import { PublicationEntitySubtypes } from "./publication.types";
import { fillDTO } from "@project/shared/helpers";
import { BadRequestException } from "@nestjs/common";


export function fillPublicationDTO(publication: PublicationEntitySubtypes) {
  const pojo = publication.toPOJO()
  switch (publication.type) {
    case PublicationType.Photo:
      return fillDTO(PhotoPublicationRdo, pojo)
    case PublicationType.Link:
      return fillDTO(LinkPublicationRdo, pojo)
    case PublicationType.Quote:
      return fillDTO(QuotePublicationRdo, pojo)
    case PublicationType.Text:
      return fillDTO(TextPublicationRdo, pojo)
    case PublicationType.Video:
      return fillDTO(VideoPublicationRdo, pojo)
    default:
      throw new BadRequestException(`Unknown publication type ${pojo.type}`)
  }
}
