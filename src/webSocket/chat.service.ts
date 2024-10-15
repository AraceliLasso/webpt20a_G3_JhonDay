import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ChatMessage } from './chat.entity';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(ChatMessage)
    private chatRepository: Repository<ChatMessage>,
  ) {}

  // Guardar un mensaje en la base de datos
  async saveMessage(userId: string, adminId: string, message: string): Promise<ChatMessage> {
    const chatMessage = this.chatRepository.create({ userId, adminId, message });
    return this.chatRepository.save(chatMessage);
  }

  // Obtener todos los mensajes para un usuario
  async getMessagesForUser(userId: string): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { userId },
      order: { createdAt: 'ASC' },
    });
  }

  // Obtener todos los mensajes entre un usuario y un admin específico
  async getMessagesBetweenUserAndAdmin(userId: string, adminId: string): Promise<ChatMessage[]> {
    return this.chatRepository.find({
      where: { userId, adminId },
      order: { createdAt: 'ASC' },
    });
  }
}
