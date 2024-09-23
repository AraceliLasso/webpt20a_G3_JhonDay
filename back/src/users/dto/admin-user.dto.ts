import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, MinLength } from "class-validator";

export class UserWithAdminDto {

    @ApiProperty({
        type: String,
        description: "The name of the user",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    @MaxLength(80)
    @MinLength(3)
    name: string;

    @ApiProperty({
        type: String,
        description: "The email of the user",
        required: true,
    })
    @IsNotEmpty()
    @IsString()
    email: string;

    @ApiProperty({
        type: String,
        description: "The age of the user",
        required: true,
    })
    @IsNumber()
    age:number

    
    @ApiProperty({
        type: String,
        description: "The phone number of the user",
        required: true,
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number;


    @ApiProperty({
        type: String,
        description: "The city where the user lives",
        required: false,
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    @IsOptional()
    city?: string;
    

    
    @ApiProperty({
        type: String,
        description: "The address where the user lives",
        required: false,
    })
    @IsString()
    @MaxLength(30)
    @MinLength(5)
    @IsOptional()
    address?: string;
    
    @IsBoolean()
    admin: boolean;
}