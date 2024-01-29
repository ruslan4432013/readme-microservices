import { ApiPropertyOptions } from '@nestjs/swagger';

export const PROPERTY = {
  ID: {
    description: 'The uniq user ID',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4'
  },
  AVATAR: {
    description: 'User avatar path',
    example: 'http://localhost:3000/static/avatar-user.jpg'
  },
  PASSWORD: {
    description: 'User password',
    example: '123456',
    minimum: 6,
    maximum: 12
  },
  FULLNAME: {
    description:
      'User\'s last name and first name',
    example: 'Adam Smith',
    minimum: 3,
    maximum: 50

  },
  EMAIL: {
    description: 'User unique address',
    example: 'user@user.ru'
  },
  SUCCESS: {
    description: 'Result of operation'
  },
  ACCESS_TOKEN: {
    description: 'Access token'
  },
  REFRESH_TOKEN: {
    description: 'Refresh token'
  },
  CREATED_AT: {
    description: 'Registration date'
  },
  SUBSCRIBERS_COUNT: {
    description: 'User subscribers count'
  }
} satisfies Record<string, ApiPropertyOptions>;
