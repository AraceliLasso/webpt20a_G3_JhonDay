import { ApiProperty } from "@nestjs/swagger";
import { CategoryResponseDto } from "src/category/dto/response-category.dto"; // Asegúrate de importar el DTO de categoría
import { Product } from "../products.entity";

export class ProductResponseDto {
  @ApiProperty({
    type: String,
    description: "El identificador único del producto, asignado por la base de datos",
    required: true,
  })
  id: string;

  @ApiProperty({
    type: String,
    description: "El nombre del producto",
    required: true,
  })
  name: string;

  @ApiProperty({
    type: String,
    description: "La descripción del producto",
    required: true,
  })
  description: string;

  @ApiProperty({
    type: Number,
    description: "El precio del producto",
    required: true,
  })
  price: number;

  @ApiProperty({
    type: String,
    description: "La URL de la imagen del producto",
    required: false,
  })
  image: string;

  @ApiProperty({
    type: () => CategoryResponseDto, // Se indica que la categoría es un DTO
    description: "La categoría del producto",
    required: true,
  })
  category: CategoryResponseDto;

  constructor(product: Product, category: CategoryResponseDto) {
    this.id = product.id;
    this.name = product.name;
    this.description = product.description;
    this.price = product.price;
    this.image = product.image;
    this.category = category;
  }
}