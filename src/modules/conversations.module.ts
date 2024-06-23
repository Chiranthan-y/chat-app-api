import { Module } from '@nestjs/common';
import { ConversationsService } from '../services/conversations/conversations.service';
import { ConversationsController } from '../controllers/conversations/conversations.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ConversationSchema } from 'src/schemas/conversation.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Conversation', schema: ConversationSchema },
    ]),
  ],
  providers: [ConversationsService],
  controllers: [ConversationsController],
  exports: [ConversationsService],
})
export class ConversationsModule {}
