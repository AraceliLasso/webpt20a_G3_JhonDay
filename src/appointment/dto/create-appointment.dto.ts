import { IsNotEmpty, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({
    description: 'Fecha y hora de la cita en formato ISO',
    example: '2024-10-10T14:00:00Z'
  })
  @IsDateString() // Valida que sea un string en formato ISO 8601 (fecha y hora)
  @IsNotEmpty()
  date: string; // Cambio de 'date' a 'date' para reflejar fecha y hora en un solo campo

  @ApiProperty({
    description: 'Descripción de la cita',
    example: 'Consulta médica'
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'ID del usuario asociado con la cita',
    example: '123e4567-e89b-12d3-a456-426614174000'
  })
  @IsUUID()
  @IsNotEmpty()
  user: string; // Manteniendo el userId para identificar al usuario asociado con el turno
}
