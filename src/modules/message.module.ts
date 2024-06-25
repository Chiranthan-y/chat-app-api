// src/modules/message.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MessageSchema } from '../schemas/message.schema';
import { MessagesService } from 'src/services/messages/message.service';
import { MessagesGateway } from 'src/gateways/message.gateway';
import { UsersModule } from './users.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Message', schema: MessageSchema }]),
    UsersModule,
  ],
  providers: [MessagesService, MessagesGateway],
  exports: [MessagesService],
})
export class MessageModule {}
