import { BadRequestException } from '@nestjs/common';

import { PublicationStatus, PublicationType } from '@project/shared/app/types';
import { fillDTO } from '@project/shared/helpers';
import {
  LinkPublicationRDO,
  PhotoPublicationRDO,
  QuotePublicationRDO,
  TextPublicationRDO, VideoPublicationRDO
} from '@project/shared/transfer-objects';

import { PrismaPublicationType, PublicationEntitySubtypes } from './publication.types';
import { LinkPublicationEntity } from './subtypes/link-publication/link-publication.entity';
import { PhotoPublicationEntity } from './subtypes/photo-publication/photo-publication.entity';
import { QuotePublicationEntity } from './subtypes/quote-publication/quote-publication.entity';
import { TextPublicationEntity } from './subtypes/text-publication/text-publication.entity';
import { VideoPublicationEntity } from './subtypes/video-publication/video-publication.entity';

import { PublicationTagEntity } from '../publication-tag/publication-tag.entity';


export function fillPublicationDTO(publication: PublicationEntitySubtypes) {
  const pojo = publication.toPOJO();
  switch (publication.type) {
    case PublicationType.Photo:
      return fillDTO(PhotoPublicationRDO, pojo);
    case PublicationType.Link:
      return fillDTO(LinkPublicationRDO, pojo);
    case PublicationType.Quote:
      return fillDTO(QuotePublicationRDO, pojo);
    case PublicationType.Text:
      return fillDTO(TextPublicationRDO, pojo);
    case PublicationType.Video:
      return fillDTO(VideoPublicationRDO, pojo);
    default:
      throw new BadRequestException(`Unknown publication type ${pojo.type}`);
  }
}


type ConnectedPublications =
  | 'PhotoPublication'
  | 'QuotePublication'
  | 'LinkPublication'
  | 'VideoPublication'
  | 'TextPublication'


type IdObject = {
  id: string,
  [key: string]: unknown
}

export const createPublication = <T extends IdObject | null>(name: ConnectedPublications, publication: T) => {
  if (!publication) {
    return null;
  }
  const upd: Record<string, unknown> = {};
  for (const [key, value] of Object.entries(publication)) {
    if (key !== 'id' && key !== 'publicationId') {
      upd[key] = value;
    }
  }
  return ({
    [name]: {
      create: {
        ...upd
      }
    }
  });
};


export const mapPrismaPublication = (publication: PrismaPublicationType): PublicationEntitySubtypes => {

  const shared = {
    id: publication.id,
    updatedAt: publication.updatedAt,
    tags: publication.tags.map(tag => PublicationTagEntity.fromObject(tag).toPOJO()),
    sourceId: publication.sourceId,
    status: publication.status as PublicationStatus,
    comments: publication._count.comments,
    likes: publication._count.like,
    createdAt: publication.createdAt,
    currentOwnerId: publication.currentOwnerId,
    isReposted: publication.isReposted,
    originalOwnerId: publication.originalOwnerId,
    publishedAt: publication.publishedAt
  };

  if (publication.PhotoPublication !== null) {
    return new PhotoPublicationEntity({
      ...shared,
      photo: publication.PhotoPublication.photo,
      type: publication.type as PublicationType.Photo
    });
  }

  if (publication.LinkPublication !== null) {
    return new LinkPublicationEntity({
      ...shared,
      description: publication.LinkPublication.description,
      url: publication.LinkPublication.url,
      type: publication.type as PublicationType.Link
    });
  }

  if (publication.QuotePublication !== null) {
    return new QuotePublicationEntity({
      ...shared,
      type: publication.type as PublicationType.Quote,
      author: publication.QuotePublication.author,
      text: publication.QuotePublication.text
    });
  }

  if (publication.TextPublication !== null) {
    return new TextPublicationEntity({
      ...shared,
      type: publication.type as PublicationType.Text,
      announcement: publication.TextPublication.announcement,
      name: publication.TextPublication.name,
      text: publication.TextPublication.text
    });
  }

  if (publication.VideoPublication !== null) {
    return new VideoPublicationEntity({
      ...shared,
      type: publication.type as PublicationType.Video,
      link: publication.VideoPublication.link,
      name: publication.VideoPublication.name
    });
  }

  throw new Error(`Wrong type ${publication.type}`);
};
