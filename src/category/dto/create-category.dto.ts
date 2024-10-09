import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsNotEmpty, IsNumber, IsPositive } from "class-validator";

export class CreateCategoryDto {
    @ApiProperty({
        type: String,
        description: "Nombre de la categoría",
        required: true,
    })
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        type: Number,
        description: "Precio de la categoría",
        required: true,
    })
    @IsNumber() // Verifica que el valor es un número
    @IsPositive() // Asegura que el número sea positivo
    @IsNotEmpty() // Asegura que no esté vacío
    price: number; // Agrega el nuevo campo price
}
