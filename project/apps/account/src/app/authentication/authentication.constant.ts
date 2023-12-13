import { ApiPropertyOptions } from '@nestjs/swagger';

export const AUTH_USER_EXISTS = 'User with this email exists';
export const AUTH_USER_NOT_FOUND = 'User not found';
export const AUTH_USER_PASSWORD_WRONG = 'User password is wrong';


export const PROPERTY = {
  ID: {
    description: 'The uniq user ID',
    example: '7fe130bd-f81b-4ff6-b570-cd2726e8c4a4',
  },
  AVATAR: {
    description: 'User avatar path',
    example: 'http://localhost:3000/static/avatar-user.jpg',
  },
  PASSWORD: {
    description: 'User password',
    example: '123456',
  },
  FULLNAME: {
    description:
      "User's last name and first name",
    example: 'Adam Smith',
    minimum: 3,
    maximum: 50,

  },
  EMAIL: {
    description: 'User unique address',
    example: 'user@user.ru',
  },
} satisfies Record<string, ApiPropertyOptions>;
