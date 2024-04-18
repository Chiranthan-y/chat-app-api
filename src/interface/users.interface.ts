import { Document } from 'mongoose';
export interface IUser extends Document {
  readonly username: string;
  readonly email: string;
  password: string;
}
