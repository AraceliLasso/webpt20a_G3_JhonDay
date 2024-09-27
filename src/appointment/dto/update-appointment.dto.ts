import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Statusenum } from '../appointment.entity';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ description: 'Identificador único para la cita', example: '123e4567-e89b-12d3-a456-426614174000' })
  id?: string;

  @ApiPropertyOptional({
    description: 'Fecha y hora de la cita en formato ISO',
    example: '2024-10-11T15:00:00Z'
  })
  @IsDateString() // Valida que sea un string en formato ISO 8601 (fecha y hora)
  @IsOptional()
  date?: string; // Cambio de 'date' y 'time' a 'date'

  @ApiPropertyOptional({ description: 'Descripción de la cita', example: 'Consulta de seguimiento' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Estado de la cita', enum: Statusenum })
  @IsEnum(Statusenum)
  @IsOptional()
  status?: Statusenum;
}
