import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class SearchDto {
  @ApiProperty({
    description: 'Nombre del producto a buscar',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  productName?: string;

  @ApiProperty({
    description: 'Nombre de la categoría para buscar',
    required: false,
    type: String,
  })
  @IsOptional()
  @IsString()
  categoryName?: string;
}
