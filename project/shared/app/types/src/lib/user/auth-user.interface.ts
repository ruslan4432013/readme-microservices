import * as mongoose from 'mongoose';

import { User } from './user.interface';

export interface AuthUser extends User {
  _id?: mongoose.Types.ObjectId
  passwordHash: string
}
