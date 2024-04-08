import { Module } from '@nestjs/common';
import { ConversationsService } from '../services/conversations/conversations.service';
import { ConversationsController } from '../controllers/conversations/conversations.controller';

@Module({
  providers: [ConversationsService],
  controllers: [ConversationsController],
})
export class ConversationsModule {}
