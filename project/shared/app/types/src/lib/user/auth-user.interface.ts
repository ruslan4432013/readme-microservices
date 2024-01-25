import { User } from './user.interface';
import * as mongoose from 'mongoose';

export interface AuthUser extends User {
  _id?: mongoose.Types.ObjectId
  passwordHash: string
}
