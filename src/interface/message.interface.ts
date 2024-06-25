// src/interfaces/message.interface.ts
import { Document } from 'mongoose';
import { IUser } from './users.interface';

export interface IMessage extends Document {
  readonly content: string;
  readonly sender: IUser;
  readonly recipient: IUser;
  readonly conversation: string;
  readonly is_read: boolean;
}
