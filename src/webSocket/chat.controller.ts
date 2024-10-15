import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { ChatService } from './chat.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { ChatMessageDto } from './dtos/chat-message.dto';
import { ChatResponseDto } from './dtos/chat-reponse.dto';

@ApiTags('chat')
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Post('message')
  @ApiOperation({ summary: 'Enviar un mensaje de chat' })
  @ApiResponse({ status: 201, description: 'Mensaje enviado correctamente', type: ChatResponseDto })
  @ApiResponse({ status: 400, description: 'Solicitud incorrecta' })
  async sendMessage(@Body() chatMessageDto: ChatMessageDto): Promise<ChatResponseDto> {
    const message = await this.chatService.saveMessage(chatMessageDto.userId, chatMessageDto.adminId, chatMessageDto.message);
    return new ChatResponseDto(message);
  }

  @Get('user/:userId')
  @ApiOperation({ summary: 'Obtener todos los mensajes para un usuario' })
  @ApiResponse({ status: 200, description: 'Mensajes recuperados correctamente', type: ChatResponseDto, isArray: true })
  async getMessagesForUser(@Param('userId') userId: string): Promise<ChatResponseDto[]> {
    const messages = await this.chatService.getMessagesForUser(userId);
    return messages.map(message => new ChatResponseDto(message));
  }

  @Get('user/:userId/admin/:adminId')
  @ApiOperation({ summary: 'Obtener mensajes entre un usuario y un administrador' })
  @ApiResponse({ status: 200, description: 'Mensajes recuperados correctamente', type: ChatResponseDto, isArray: true })
  async getMessagesBetweenUserAndAdmin(
    @Param('userId') userId: string,
    @Param('adminId') adminId: string,
  ): Promise<ChatResponseDto[]> {
    const messages = await this.chatService.getMessagesBetweenUserAndAdmin(userId, adminId);
    return messages.map(message => new ChatResponseDto(message));
  }
}
