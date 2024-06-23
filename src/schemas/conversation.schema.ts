import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { User } from './users.schema';
import { Types } from 'mongoose';
import { Message } from './message.schema';

@Schema({
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
})
export class Conversation {
  @Prop({
    type: [{ type: Types.ObjectId, ref: 'User' }],
    required: true,
    validate: [
      arrayMinLength(2),
      'A conversation must have at least 2 participants',
    ],
  })
  participants: User[];

  @Prop({ type: String })
  title?: string;

  @Prop({ type: Types.ObjectId, ref: 'Message' })
  last_message?: Message;
}

function arrayMinLength(min: number) {
  return (v) => v.length >= min;
}

export const ConversationSchema = SchemaFactory.createForClass(Conversation);
