import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity()
export class ChatMessage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  userId: string;

  @Column()
  adminId: string;

  @Column('text')
  message: string;

  @CreateDateColumn()
  createdAt: Date;
}

