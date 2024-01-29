import { Request } from 'express';

import { User } from './user';

export interface RequestWithTokenPayload extends Request {
  user?: User;
}

