import { IsDate, IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Appointment date', example: '2024-10-10' })
  @IsDate()
  @IsNotEmpty()
  date: Date;

  @ApiProperty({ description: 'Appointment time', example: '14:00' })
  @IsString()
  @IsNotEmpty()
  time: string;

  @ApiProperty({ description: 'Description of the appointment', example: 'Medical consultation' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID of the user associated with the appointment', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  userId: string;
}
