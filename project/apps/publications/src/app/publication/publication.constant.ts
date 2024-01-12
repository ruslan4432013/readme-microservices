import { ApiPropertyOptions } from '@nestjs/swagger';
import { PUBLICATION } from "@project/shared/core";
import { SortVariants } from "@project/shared/app/types";
import { Prisma } from "@prisma/client";


export const ALLOWED_HOSTS = ['youtube.com', 'youtu.be']

export const MESSAGES = {
  WRONG_LINK: 'Link must be from youtube'
}

export const DEFAULT = {
  PUBLICATION_COUNT_LIMIT: 25,
  PAGE_COUNT: 1,
  SORT_VARIANT: SortVariants.Date
}

export const SORT_MAP: Record<SortVariants, Prisma.PublicationOrderByWithRelationInput> = {
  [SortVariants.Date]: {
    createdAt: 'desc'
  },
  [SortVariants.Likes]: {
    like: {
      _count: "desc"
    }
  },
  [SortVariants.Comments]: {
    comments: {
      _count: "desc"
    }
  }
}

export const PROPERTY = {
  OWNER_ID: {
    description: 'Publication owner id',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4',
  },
  NAME: {
    description: 'Publication title',
    example: 'Super Publication',
    minimum: 20,
    maximum: 50,
  },
  VIDEO_LINK: {
    description: 'Link to video (only youtube)',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
  },
  TAGS: {
    description: 'List of tags for publication',
    example: ['beautifully', 'hair', 'juicy'],
    required: false,
    maximum: PUBLICATION.TAGS.MAX
  },
  ANNOUNCEMENT: {
    description: 'Text announcing the publication',
    example: 'Attention! Best music event in the world',
    minimum: 50,
    maximum: 255,
  },
  TEXT: {
    description: 'Publication text',
    example: 'Text of publication',
    minimum: 100,
    maximum: 1024,
  },
  QUOTE_TEXT: {
    description: 'Quote text',
    example: "I'm the best warrior",
    minimum: 20,
    maximum: 300
  },
  AUTHOR: {
    description: 'Author of the quote',
    example: 'Jason St.',
    minimum: 3,
    maximum: 50
  },
  PHOTO: {
    description: 'Photo of the publication',
  },
  URL: {
    description: 'Valid URL',
    example: 'http://example.com',
  },
  DESCRIPTION: {
    description: 'Link description',
    example: 'There is best of the best cakes',
    maximum: 300
  },
} satisfies Record<string, ApiPropertyOptions>;


export const PUBLICATION_QUERY = {
  INCLUDE: {
    publication: {
      include: {
        tags: true,
        _count: {
          select: {
            like: true,
            comments: true
          }
        }
      }
    },
  }
} as const
