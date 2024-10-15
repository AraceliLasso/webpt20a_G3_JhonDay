import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';

@WebSocketGateway({ cors: true })
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private readonly chatService: ChatService) {}

  // Evento que se dispara cuando un cliente se conecta
  handleConnection(client: Socket) {
    const userId = client.handshake.query.userId as string;
    client.join(userId); // Unirse a una sala única por cada usuario
    console.log(`Client connected: ${userId}`);
  }

  // Evento que se dispara cuando un cliente se desconecta
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Manejar el evento de enviar mensaje
  @SubscribeMessage('sendMessage')
  async handleMessage(@MessageBody() data: { userId: string, adminId: string, message: string }): Promise<void> {
    // Guardar el mensaje en la base de datos
    const savedMessage = await this.chatService.saveMessage(data.userId, data.adminId, data.message);

    // Emitir el mensaje guardado a la sala del usuario y del admin
    this.server.to(data.userId).emit('receiveMessage', savedMessage);
    this.server.to(data.adminId).emit('receiveMessage', savedMessage);
  }
}
