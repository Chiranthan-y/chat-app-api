import { Document } from 'mongoose';
import { IUser } from './users.interface';

export interface IConversation extends Document {
  participants: Array<IUser>;
  title: string;
  last_message: string;
}
