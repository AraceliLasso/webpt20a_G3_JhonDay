import { IsNotEmpty, IsString, IsUUID, IsDateString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import UserResponseDto from 'src/users/dto/response-user.dto';
import { CategoryResponseDto } from 'src/category/dto/response-category.dto';

export class CreateAppointmentDto {
  @ApiProperty({ description: 'Fecha y hora de la cita en formato ISO', example: '2024-10-10T14:00:00Z' })
  @IsDateString()
  @IsNotEmpty()
  date: string;

  @ApiProperty({ description: 'Descripción de la cita', example: 'Consulta médica' })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: 'ID del usuario asociado con la cita', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  user: string;

  @ApiProperty({ description: 'ID de la categoría asociada con la cita', example: '123e4567-e89b-12d3-a456-426614174000' })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;

  @ApiProperty({ description: 'Usuario asociado con la cita' })
  userId: UserResponseDto;

  @ApiProperty({ description: 'Categoría asociada con la cita' })
  category: CategoryResponseDto;
  
  status?: string;
}

