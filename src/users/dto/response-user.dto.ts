import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export default class UserResponseDto {

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
    @IsEmail()
    email: string;


    @ApiProperty({
        type: String,
        description: "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)",
        required: true,
    })
    @Matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[=!@#$%^&*])[A-Za-z\d=!@#$%^&*]{8,15}$/,
        {
            message:
            "The password must contain at least one lowercase letter, one uppercase letter, one number, and one special character (!@#$%^&*)"
        }
    )
    @IsString()
    password: string;

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
    @MaxLength(80)
    @MinLength(3)
    @IsString()
    @IsOptional()
    address?: string;


    constructor(partial: Partial<UserResponseDto>){ //significa que puede venir otras propiedades o menos de las que declaro, por ejemplo password
        const {name, age, email, address, phone, city} = partial;
        this.name = name;
        this.age = age;
        this.email = email;
        this.address = address;
        this.phone = phone;
        this.city = city;
    }
}
