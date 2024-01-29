import { ApiPropertyOptions } from '@nestjs/swagger';
import { Prisma } from '@prisma/client';

import { SortVariants } from '@project/shared/app/types';
import { PUBLICATION } from '@project/shared/core';


export const MESSAGES = {
  WRONG_LINK: 'Link must be from youtube',
  NOT_OWNER: 'User is not owner of publication',
  UNKNOWN_USER: 'Unknown user',
  OWNER_AND_USER_SAME: 'Owner of publication can\'t repost own publication or this publication is reposted',
  INCORRECT_PUBLICATION_TYPE: (type: string) => `Incorrect publication type: ${type}`,
  INCORRECT_PUBLICATION_ID: (id: string) => `Incorrect publication id: ${id}`,
  LIKE_EXIST: 'This publication is liked by this user',
  PUBLICATION_NOT_PUBLISHED: 'This publication not published',
  NO_LIKE: 'This publication is not liked by this user'
};

export const DEFAULT = {
  PUBLICATION_COUNT_LIMIT: 25,
  MAX_SEARCH_LIMIT: 20,
  PAGE_COUNT: 1,
  SORT_VARIANT: SortVariants.Date
};

export const SORT_MAP: Record<SortVariants, Prisma.PublicationOrderByWithRelationInput> = {
  [SortVariants.Date]: {
    publishedAt: 'desc'
  },
  [SortVariants.Likes]: {
    like: {
      _count: 'desc'
    }
  },
  [SortVariants.Comments]: {
    comments: {
      _count: 'desc'
    }
  }
};

export const PROPERTY = {
  OWNER_ID: {
    description: 'Publication owner id',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4'
  },
  NAME: {
    description: 'Publication title',
    example: 'Super Publication',
    minimum: 20,
    maximum: 50
  },
  VIDEO_LINK: {
    description: 'Link to video (only youtube)',
    example: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ'
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
    maximum: 255
  },
  TEXT: {
    description: 'Publication text',
    example: 'Text of publication',
    minimum: 100,
    maximum: 1024
  },
  QUOTE_TEXT: {
    description: 'Quote text',
    example: 'I\'m the best warrior',
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
    description: 'Photo of the publication'
  },
  URL: {
    description: 'Valid URL',
    example: 'http://example.com'
  },
  DESCRIPTION: {
    description: 'Link description',
    example: 'There is best of the best cakes',
    maximum: 300
  }
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
    }
  }
} as const;


export const PUBLICATION_SEARCH_QUERY = {
  take: DEFAULT.MAX_SEARCH_LIMIT,
  orderBy: {
    publishedAt: 'desc'
  },
  include: {
    LinkPublication: true,
    PhotoPublication: true,
    QuotePublication: true,
    TextPublication: true,
    VideoPublication: true,
    tags: true,
    _count: {
      select: {
        like: true,
        comments: true
      }
    }
  }
} as const;


export const PUBLICATION_SEARCH_WHERE_OR = (search: string): Prisma.PublicationWhereInput[] => ([
  {
    LinkPublication: {
      url: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    LinkPublication: {
      description: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    QuotePublication: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    QuotePublication: {
      author: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    TextPublication: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    TextPublication: {
      announcement: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    TextPublication: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    TextPublication: {
      text: {
        contains: search,
        mode: 'insensitive'
      }
    }
  },
  {
    VideoPublication: {
      name: {
        contains: search,
        mode: 'insensitive'
      }
    } as const
  }
]);
