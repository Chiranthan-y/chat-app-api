import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateConversationDto } from 'src/dto/conversation/create-conversation.dto';
import { UpdateConversationDto } from 'src/dto/conversation/update-conversation.dto';
import { IConversation } from 'src/interface/conversation.interface';

@Injectable()
export class ConversationsService {
  constructor(
    @InjectModel('Conversation')
    private readonly conversationModel: Model<IConversation>,
  ) {}

  async createConversation(
    createConversationDto: CreateConversationDto,
  ): Promise<IConversation> {
    const newConversation = new this.conversationModel(createConversationDto);
    return await newConversation.save();
  }

  async getAllConversations(): Promise<IConversation[]> {
    return await this.conversationModel.find().exec();
  }

  async getConversationById(id: string): Promise<IConversation> {
    const conversation = await this.conversationModel.findById(id).exec();
    if (!conversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return conversation;
  }

  async updateConversation(
    id: string,
    updateConversationDto: UpdateConversationDto,
  ): Promise<IConversation> {
    const updatedConversation = await this.conversationModel.findByIdAndUpdate(
      id,
      updateConversationDto,
      { new: true },
    );
    if (!updatedConversation) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return updatedConversation;
  }

  async deleteConversation(id: string): Promise<boolean> {
    const deleted = await this.conversationModel.findByIdAndDelete(id).exec();
    if (!deleted) {
      throw new NotFoundException(`Conversation with ID ${id} not found`);
    }
    return true;
  }

  async getConversationsByUserId(userId: string): Promise<IConversation[]> {
    return await this.conversationModel.find({ participants: userId }).exec();
  }
}
