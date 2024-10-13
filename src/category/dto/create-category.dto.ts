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


    /////////////////////////jhon
    @ApiProperty({
        type: Number,
        description: "Precio de la categoría",
        required: true,
    })
    @IsNumber() 
    @IsPositive() 
    @IsNotEmpty() 
    price: number;
    /////////////////////////jhon
}
