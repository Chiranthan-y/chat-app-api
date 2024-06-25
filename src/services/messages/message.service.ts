// src/services/messages.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IMessage } from 'src/interface/message.interface';

@Injectable()
export class MessagesService {
  constructor(
    @InjectModel('Message')
    private readonly messageModel: Model<IMessage>,
  ) {}

  async createMessage(createMessageDto: any): Promise<IMessage> {
    const newMessage = new this.messageModel(createMessageDto);
    return await newMessage.save();
  }

  async getMessagesByConversationId(
    conversationId: string,
  ): Promise<IMessage[]> {
    return await this.messageModel
      .find({ conversation: conversationId })
      .exec();
  }
}
