import { ApiPropertyOptions } from '@nestjs/swagger';

import { PUBLICATION_TAG } from "@project/shared/core";

export const PROPERTY = {
  TITLE: {
    description: 'Uniq tag name',
    example: 'cars',
    minimum: PUBLICATION_TAG.TITLE.MIN,
    maximum: PUBLICATION_TAG.TITLE.MAX
  }
} satisfies Record<string, ApiPropertyOptions>;

export const MAX_TAG_LIMIT = 10;
