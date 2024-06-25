import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Delete,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CreateConversationDto } from 'src/dto/conversation/create-conversation.dto';
import { UpdateConversationDto } from 'src/dto/conversation/update-conversation.dto';
import { IConversation } from 'src/interface/conversation.interface';
import { DefaultResponse } from 'src/interface/response.interface';
import { AuthGuard } from 'src/guard/auth.guard';
import { ConversationsService } from 'src/services/conversations/conversations.service';

@Controller('conversations')
@UseGuards(AuthGuard)
export class ConversationsController {
  constructor(private readonly conversationService: ConversationsService) {}

  // GET /conversations
  @Get()
  async getAllConversations(
    @Res() response,
  ): Promise<DefaultResponse<IConversation[]>> {
    try {
      const conversations =
        await this.conversationService.getAllConversations();
      return response.status(HttpStatus.OK).json({
        message: 'Conversations retrieved successfully',
        status: HttpStatus.OK,
        conversations,
        error: null,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Unable to retrieve conversations',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  // GET /conversations/:id
  @Get(':id')
  async getConversationById(
    @Res() response,
    @Param('id') id: string,
  ): Promise<DefaultResponse<IConversation>> {
    try {
      const conversation =
        await this.conversationService.getConversationById(id);
      if (!conversation) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Conversation not found',
          status: HttpStatus.NOT_FOUND,
          error: null,
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Conversation retrieved successfully',
        status: HttpStatus.OK,
        conversation,
        error: null,
      });
    } catch (error) {
      return response.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
        message: 'Unable to retrieve conversation',
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        error,
      });
    }
  }

  // POST /conversations/create
  @Post('create')
  async createConversation(
    @Res() response,
    @Body() createConversationDto: CreateConversationDto,
    @Req() request,
  ): Promise<DefaultResponse<IConversation>> {
    try {
      if (request.user) {
        createConversationDto.participants.push(request.user.id);
        const conversation = await this.conversationService.createConversation(
          createConversationDto,
        );
        return response.status(HttpStatus.OK).json({
          message: 'Conversation created successfully',
          status: HttpStatus.OK,
          conversation,
          error: null,
        });
      }
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to create new conversation',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }

  // PUT /conversations/:id/update
  @Put(':id/update')
  async updateConversation(
    @Res() response,
    @Param('id') id: string,
    @Body() updateConversationDto: UpdateConversationDto,
  ): Promise<DefaultResponse<IConversation>> {
    try {
      const updatedConversation =
        await this.conversationService.updateConversation(
          id,
          updateConversationDto,
        );
      if (!updatedConversation) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Conversation not found',
          status: HttpStatus.NOT_FOUND,
          error: null,
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Conversation updated successfully',
        status: HttpStatus.OK,
        conversation: updatedConversation,
        error: null,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to update conversation',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }

  // DELETE /conversations/:id/delete
  @Delete(':id/delete')
  async deleteConversation(
    @Res() response,
    @Param('id') id: string,
  ): Promise<DefaultResponse<string>> {
    try {
      const deletedConversation =
        await this.conversationService.deleteConversation(id);
      if (!deletedConversation) {
        return response.status(HttpStatus.NOT_FOUND).json({
          message: 'Conversation not found',
          status: HttpStatus.NOT_FOUND,
          error: null,
        });
      }
      return response.status(HttpStatus.OK).json({
        message: 'Conversation deleted successfully',
        status: HttpStatus.OK,
        conversationId: id,
        error: null,
      });
    } catch (error) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        message: 'Unable to delete conversation',
        status: HttpStatus.BAD_REQUEST,
        error,
      });
    }
  }
}
