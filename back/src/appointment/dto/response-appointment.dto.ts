import { ApiProperty } from '@nestjs/swagger';
import { Statusenum } from '../appointment.entity';
import { Appointment } from '../appointment.entity';

export class AppointmentResponseDto {
  @ApiProperty({ description: 'Unique identifier for the appointment', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Date of the appointment', example: '2024-10-10' })
  date: Date;

  @ApiProperty({ description: 'Time of the appointment', example: '14:00' })
  time: string;

  @ApiProperty({ description: 'Description of the appointment', example: 'Medical consultation' })
  description: string;

  @ApiProperty({ description: 'User ID associated with the appointment', example: '123e4567-e89b-12d3-a456-426614174000' })
  userId: string;

  @ApiProperty({ description: 'Status of the appointment', enum: Statusenum })
  status: Statusenum;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.time = appointment.time;
    this.description = appointment.description;
    this.userId = appointment.userId;
    this.status = appointment.status;
  }
}
