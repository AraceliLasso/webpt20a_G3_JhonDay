import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsNumber } from 'class-validator';

export class SearchDto {
  @ApiProperty({ description: 'Nombre del producto a buscar', required: false, type: String })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({ description: 'Nombre de la categoría para buscar', required: false, type: String })
  @IsOptional()
  @IsString()
  categoryName?: string;

  @ApiProperty({ description: 'Descripción del producto a buscar', required: false, type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Precio para buscar productos más cercanos a este valor', required: false, type: Number })
  @IsOptional()
  @IsNumber()
  price?: number;
}

