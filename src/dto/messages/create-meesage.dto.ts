// src/dto/message/create-message.dto.ts
export class CreateMessageDto {
  readonly content: string;
  readonly sender: string;
  readonly recipient: string;
  readonly conversation: string;
}
