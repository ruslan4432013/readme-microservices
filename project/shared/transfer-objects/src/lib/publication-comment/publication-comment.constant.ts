import { ApiPropertyOptions } from '@nestjs/swagger';

export const PROPERTY = {
  MESSAGE: {
    description: 'Comment message',
    example: 'Super Publication',
    minimum: 10,
    maximum: 300
  },
  COMMENT_ID: {
    description: 'Comment id'
  }
} satisfies Record<string, ApiPropertyOptions>;
