import { ChatMessage } from "../chat.entity";


export class ChatResponseDto {
  id: string;
  userId: string;
  adminId: string;
  message: string;
  createdAt: Date;

  constructor(chatMessage: ChatMessage) {
    this.id = chatMessage.id;
    this.userId = chatMessage.userId;
    this.adminId = chatMessage.adminId;
    this.message = chatMessage.message;
    this.createdAt = chatMessage.createdAt;
  }
}
