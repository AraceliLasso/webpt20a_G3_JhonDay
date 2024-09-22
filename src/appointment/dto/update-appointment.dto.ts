import { IsDate, IsEnum, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Statusenum } from '../appointment.entity';

export class UpdateAppointmentDto {
  @ApiPropertyOptional({ description: 'Appointment date', example: '2024-10-11' })
  @IsDate()
  @IsOptional()
  date?: Date;

  @ApiPropertyOptional({ description: 'Appointment time', example: '15:00' })
  @IsString()
  @IsOptional()
  time?: string;

  @ApiPropertyOptional({ description: 'Description of the appointment', example: 'Follow-up consultation' })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({ description: 'Status of the appointment', enum: Statusenum })
  @IsEnum(Statusenum)
  @IsOptional()
  status?: Statusenum;
}
