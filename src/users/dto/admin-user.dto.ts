import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserWithAdminDto {

    @ApiProperty({
        type: String,
        description: "El identificador único del usuario",
        required: true,
    })
    @IsNotEmpty()
    @IsString()  // O @IsNumber() si es un número
    id: string;  // O id: number; dependiendo de cómo esté definido en tu base de datos

    @ApiProperty({
        type: String,
        description: "El nombre del usuario",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @MinLength(3)
    name: string;

    @ApiProperty({
        type: String,
        description: "El correo electrónico del usuario",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        type: Number,
        description: "La edad del usuario",
        required: true,
    })
    @IsNumber()
    age: number;

    @ApiProperty({
        type: String,
        description: "El número de teléfono del usuario",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;

    @ApiProperty({
        type: String,
        description: "La ciudad donde vive el usuario",
        required: false,
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    @IsOptional()
    city?: string;

    @ApiProperty({
        type: String,
        description: "La dirección donde vive el usuario",
        required: false,
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    @IsOptional()
    address?: string;

    @ApiProperty({
        type: Boolean,
        description: "Indica si el usuario tiene permisos de administrador",
        required: true,
    })
    @IsBoolean()
    admin: boolean;
}
