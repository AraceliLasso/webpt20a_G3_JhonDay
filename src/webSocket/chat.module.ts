import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatService } from './chat.service';
import { ChatController } from './chat.controller';
import { ChatMessage } from './chat.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatMessage])],
  providers: [ChatService],
  controllers: [ChatController],
})
export class ChatModule {}
