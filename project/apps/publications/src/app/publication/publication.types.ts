import { PublicationStatus, PublicationType } from '@prisma/client';

import { LinkPublicationEntity } from './subtypes/link-publication/link-publication.entity';
import { PhotoPublicationEntity } from './subtypes/photo-publication/photo-publication.entity';
import { QuotePublicationEntity } from './subtypes/quote-publication/quote-publication.entity';
import { TextPublicationEntity } from './subtypes/text-publication/text-publication.entity';
import { VideoPublicationEntity } from './subtypes/video-publication/video-publication.entity';


export type PublicationEntitySubtypes =
  | VideoPublicationEntity
  | QuotePublicationEntity
  | TextPublicationEntity
  | PhotoPublicationEntity
  | LinkPublicationEntity


type PrismaTag = { id: string, title: string, createdAt: Date, updatedAt: Date }

type PrismaVideo = {
  publicationId: string
  id: string
  link: string
  name: string
}

type PrismaLink = {
  id: string,
  url: string,
  description: string,
  publicationId: string
}


type PrismaQuote = {
  publicationId: string
  id: string
  text: string
  author: string
}

type PrismaText = {
  publicationId: string
  id: string
  name: string
  text: string
  announcement: string
}

type PrismaPhoto = {
  publicationId: string
  id: string
  photo: string
}

export type PrismaPublicationType = {
  tags: PrismaTag[],
  id: string
  createdAt: Date
  updatedAt: Date,
  publishedAt: Date | null,
  isReposted: boolean
  currentOwnerId: string
  originalOwnerId: string
  sourceId: string
  status: PublicationStatus
  type: PublicationType
  LinkPublication: PrismaLink | null,
  VideoPublication: PrismaVideo | null,
  TextPublication: PrismaText | null,
  QuotePublication: PrismaQuote | null,
  PhotoPublication: PrismaPhoto | null,
  _count: {
    comments: number,
    like: number
  }
}
