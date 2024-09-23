import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, IsString, Matches } from "class-validator"

export class LoginUserDto{
    @ApiProperty({
        type: String,
        description: "The email of the user",
        required: true,
    })
    @IsEmail()
    @IsNotEmpty()
    email:string;


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
    @IsNotEmpty()
    @IsString()
    password: string;
}