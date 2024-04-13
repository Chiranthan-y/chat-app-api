import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { MessagesService } from './services/messages/messages.service';
import { UsersService } from './services/users/users.service';

import { AppController } from './app.controller';
import { UsersController } from './controllers/users/users.controller';
import { MessagesController } from './controllers/messages/messages.controller';

import { AuthModule } from './modules/auth.module';
import { MessagesModule } from './modules/messages.module';
import { UsersModule } from './modules/users.module';

import { ConversationsModule } from './modules/conversations.module';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatDB'),
    UsersModule,
    AuthModule,
    MessagesModule,
    ConversationsModule,
  ],
  controllers: [AppController, UsersController, MessagesController],
  providers: [AppService, UsersService, MessagesService],
})
export class AppModule {}
