import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppService } from './app.service';
import { MessagesService } from './services/messages/message.service';
import { UsersService } from './services/users/users.service';

import { AppController } from './app.controller';
import { UsersController } from './controllers/users/users.controller';
import { MessagesController } from './controllers/messages/messages.controller';

import { AuthModule } from './modules/auth.module';
import { UsersModule } from './modules/users.module';

import { ConversationsModule } from './modules/conversations.module';
import { UserSchema } from './schemas/users.schema';
import { AuthMiddleware } from './middleware/auth.middleware';
import { MessagesGateway } from './gateways/message.gateway';
import { MessageModule } from './modules/message.module';
import { MessageSchema } from './schemas/message.schema';
import { ConversationSchema } from './schemas/conversation.schema';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/chatDB'),
    MongooseModule.forFeature([
      { name: 'User', schema: UserSchema },
      { name: 'Message', schema: MessageSchema },
      { name: 'Conversation', schema: ConversationSchema },
    ]),
    UsersModule,
    AuthModule,
    MessageModule,
    ConversationsModule,
  ],
  controllers: [AppController, UsersController, MessagesController],
  providers: [AppService, UsersService, MessagesService, MessagesGateway],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes('users')
      .apply(AuthMiddleware)
      .forRoutes('conversations');
  }
}
