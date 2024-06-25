// src/gateways/messages.gateway.ts
import { UseGuards } from '@nestjs/common';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/guard/wsauth.guard';
import { IMessage } from 'src/interface/message.interface';
import { MessagesService } from 'src/services/messages/message.service';

@WebSocketGateway()
export class MessagesGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  constructor(private readonly messagesService: MessagesService) {}

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @UseGuards(WsAuthGuard)
  @SubscribeMessage('sendMessage')
  async handleMessage(
    @MessageBody() createMessageDto: any,
    @ConnectedSocket() client: Socket,
  ): Promise<IMessage> {
    createMessageDto = JSON.parse(createMessageDto);
    const message = await this.messagesService.createMessage(
      createMessageDto.data,
    );
    console.log({ message });
    const user = (client.handshake as any).user;
    console.log({ user });
    this.server.emit('messageReceived', message);
    return message;
  }
}
