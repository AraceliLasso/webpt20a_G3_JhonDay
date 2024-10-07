import { ApiProperty } from '@nestjs/swagger';
import { Statusenum } from '../appointment.entity';
import { Appointment } from '../appointment.entity';
import UserResponseDto from 'src/users/dto/response-user.dto';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';

export class AppointmentResponseDto {
  @ApiProperty({ description: 'Identificador único para la cita', example: '123e4567-e89b-12d3-a456-426614174000' })
  id: string;

  @ApiProperty({ description: 'Fecha y hora de la cita en formato ISO', example: '2024-10-10T14:00:00Z' })
  date: Date;

  @ApiProperty({ description: 'Descripción de la cita', example: 'Consulta médica' })
  description: string;

  @ApiProperty({ description: 'Usuario asociado con la cita' })
  user: UserResponseDto; // Cambié user por un objeto de tipo User

  @ApiProperty({ description: 'Usuario asociado con la cita' })
  category: CategoryResponseDto; // Cambié user por un objeto de tipo User

  @ApiProperty({ description: 'Estado de la cita', enum: Statusenum })
  status: Statusenum;

  constructor(appointment: Appointment) {
    this.id = appointment.id;
    this.date = appointment.date;
    this.description = appointment.description;
    this.user = appointment.user; // Asignamos el objeto user en vez del user
    this.category = appointment.category; // Asignamos el objeto product
    this.status = appointment.status;
  }
}
