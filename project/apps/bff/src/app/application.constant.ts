import { ApiPropertyOptions, ApiQueryOptions, getSchemaPath } from '@nestjs/swagger';

import { PublicationType, SortVariants } from '@project/shared/app/types';
import {
  LinkPublicationRDO,
  PhotoPublicationRDO,
  QuotePublicationRDO,
  TextPublicationRDO, VideoPublicationRDO
} from '@project/shared/transfer-objects';


export const PROPERTY = {
  ID: {
    description: 'The uniq file ID',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4'
  },
  PUBLICATIONS: {
    description: 'Publication count',
    type: Number
  },
  SUBSCRIBERS: {
    description: 'Subscribers count',
    type: Number
  },
  CREATED_AT: {
    description: 'Register date',
    type: Date
  },
  EMAIL: {
    description: 'User email'
  },
  FIRSTNAME: {
    description: 'User firstname'
  },
  LASTNAME: {
    description: 'User lastname'
  }
} satisfies Record<string, ApiPropertyOptions>;

export const QUERY_OPTIONS = {
  SKIP: {
    name: 'skip',
    required: false,
    type: Number
  },
  LIMIT: {
    name: 'limit',
    type: Number
  },
  SORT: {
    name: 'sort',
    enum: SortVariants,
    description: 'Sorting by (date it publication date)'
  },
  PAGE: {
    name: 'page',
    type: Number
  },
  USER_ID: {
    name: 'userId',
    type: String
  },
  TYPE: {
    name: 'type',
    enum: PublicationType
  },
  TAGS: {
    name: 'tags',
    type: [String]
  },
  FIND: {
    name: 'search',
    required: true,
    type: String
  }
} satisfies Record<string, ApiQueryOptions>;

export const DESCRIPTIONS = {
  FIND_PUBLICATIONS: 'Find publications by search',
  USERS_PUBLICATIONS: 'Find current users publications',
  UPDATE: 'Update publication',
  REPOST: 'Repost publication',
  SHOW: 'Show publication by id',
  CREATE: 'Create publication',
  REMOVE: 'Remove publication by id',
  COMMENTS: {
    CREATE: 'Create comment',
    REMOVE: 'Remove comment',
    SHOW: 'Get comments'
  },
  ACCOUNT: {
    REGISTER: 'Register user',
    LOGIN: 'Login user by email and password',
    REFRESH_TOKENS: 'Refresh user JWT tokens',
    SHOW_USER_DETAIL: 'Show detail info about user',
    CHANGE_PASSWORD: 'Change password'
  },
  LIKES: {
    LIKE: 'Like publication',
    DISLIKE: 'Dislike publication'
  }
};


export const MANY_PUBLICATION = (description: string) => ({
  schema: {
    type: 'array',
    items: {
      maximum: DEFAULT.MAX_PUBLICATION_FIND,
      oneOf: [
        { $ref: getSchemaPath(QuotePublicationRDO) },
        { $ref: getSchemaPath(LinkPublicationRDO) },
        { $ref: getSchemaPath(TextPublicationRDO) },
        { $ref: getSchemaPath(PhotoPublicationRDO) },
        { $ref: getSchemaPath(VideoPublicationRDO) }
      ]
    }
  },
  description
} as const);


export const ERROR_MESSAGES = {
  LOGGED: {
    MESSAGE: 'Conflict with current logged-in user',
    DETAILS: 'User is already logged in. Please log out before registering a new account.'
  }
};

export const PUBLICATION_ERROR_MESSAGES = {
  NOT_OWNER: 'User is not owner of publication',
  WRONG_USER: 'Wrong user in request'
};

export const DEFAULT = {
  PUBLICATION_COUNT_LIMIT: 25,
  MAX_PUBLICATION_FIND: 20,
  PAGE_COUNT: 1,
  SORT_VARIANT: SortVariants.Date
};


export const MAX_PHOTO_PUBLICATION_SIZE = 1e6;
export const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png'];
