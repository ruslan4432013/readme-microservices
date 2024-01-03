import { ApiPropertyOptions } from '@nestjs/swagger';

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
    description: 'Link to video',
    example: 'http://example.com',
  },
  TAGS: {
    description: 'List of tags for publication',
    example: ['beautifully', 'hair', 'juicy'],
  },
  ANNOUNCEMENT: {
    description: 'Text announcing the publication',
    example: 'Attention! Best music event in the world',
  },
  TEXT: {
    description: 'Publication text',
    example: 'Text of publication',
  },
  QUOTE_TEXT: {
    description: 'Quote text',
    example: "I'm the best warrior",
  },
  AUTHOR: {
    description: 'Author of the quote',
    example: 'Jason St.',
  },
  PHOTO: {
    description: 'Photo of the publication',
  },
  LINK: {
    description: 'Valid URL',
    example: 'http://example.com',
  },
  DESCRIPTION: {
    description: 'Link description',
    example: 'There is best of the best cakes',
  },
} satisfies Record<string, ApiPropertyOptions>;
