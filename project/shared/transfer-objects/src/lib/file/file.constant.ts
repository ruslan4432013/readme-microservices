import { ApiPropertyOptions } from '@nestjs/swagger';

export const PROPERTY = {
  ID: {
    description: 'The uniq file ID',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4'
  },
  ORIGINAL_NAME: {
    description: 'Original file name'
  },
  HASH_NAME: {
    description: 'Hashed file name'
  },
  SUB_DIRECTORY: {
    description: 'Directory for file'
  },
  MIMETYPE: {
    description: 'Mimetype of file'
  },
  SIZE: {
    description: 'File size'
  }
} satisfies Record<string, ApiPropertyOptions>;
