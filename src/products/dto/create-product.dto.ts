// import { ApiProperty } from "@nestjs/swagger";
// import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

// export class CreateProductDto {
//   @ApiProperty({
//     type: String,
//     description: "El nombre del producto",
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   name: string;

//   @ApiProperty({
//     type: String,
//     description: "La descripción del producto",
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   description: string;

//   @ApiProperty({
//     type: Number,
//     description: "El precio del producto",
//     required: true,
//   })
//   @IsNumber() // Permitir decimales
//   @IsNotEmpty()
//   price: number;

//   @ApiProperty({
//     type: String,
//     description: "La URL de la imagen del producto",
//     required: true,
//   })
//   @IsString()
//   @IsNotEmpty()
//   image: string;

//   @ApiProperty({
//     type: String,
//     description: "ID de la categoría del producto",
//     required: true,
//   })
//   @IsUUID()
//   @IsNotEmpty()
//   categoryId: string;
// }


import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsString, IsUUID } from "class-validator";

export class CreateProductDto {
  @ApiProperty({ description: "El nombre del producto", required: true })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ description: "La descripción del producto", required: true })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({ description: "El precio del producto", required: true })
  @IsNumber()
  @IsNotEmpty()
  price: number;

  @ApiProperty({ description: "URL de la imagen del producto", required: true })
  @IsString()
  @IsNotEmpty()
  image: string;

  @ApiProperty({ description: "ID de la categoría", required: true })
  @IsUUID()
  @IsNotEmpty()
  categoryId: string;
}
