import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsNotEmpty, MaxLength, MinLength } from 'class-validator';

export class UpdateProfileDto {
    @ApiProperty({
        type: Number,
        description: "La edad del usuario",
        required: true,
    })
    @IsNumber()
    age: number;

    @ApiProperty({
        type: Number,
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
    @MaxLength(80)
    @MinLength(3)
    @IsString()
    @IsOptional()
    address?: string;
}