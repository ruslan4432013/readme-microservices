import { TokenPayload, User } from '@project/shared/app/types';


export function createJWTPayload(user: User): TokenPayload {
  return {
    sub: user.id!,
    email: user.email,
    fullname: user.fullname,
  };
}
