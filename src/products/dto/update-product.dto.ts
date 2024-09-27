import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, IsNumber } from "class-validator";

export class UpdateProductDto {
  @ApiProperty({
    type: String,
    description: "El nuevo nombre del producto",
    required: false,
  })
  @IsOptional()
  @IsString()
  name?: string;

  @ApiProperty({
    type: String,
    description: "La nueva descripción del producto",
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    type: Number,
    description: "El nuevo precio del producto",
    required: false,
  })
  @IsOptional()
  @IsNumber() // Permitir decimales
  price?: number;

  @ApiProperty({
    type: String,
    description: "La nueva URL de la imagen del producto",
    required: false,
  })
  @IsOptional()
  @IsString()
  image?: string;
}
