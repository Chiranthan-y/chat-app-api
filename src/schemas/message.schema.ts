import { Prop, Schema } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Types } from 'mongoose';
import { Conversation } from './conversation.schema';
@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Message {
  @Prop({ isRequired: true })
  content: string;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  sender: User;

  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  recipient: User;

  @Prop({ type: Types.ObjectId, ref: 'Conversation', required: true })
  conversation: Conversation;

  @Prop({ default: false })
  is_read: boolean;
}
