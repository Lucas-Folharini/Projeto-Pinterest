import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";

export class AuthDTO{

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email!: string;


    @IsNotEmpty()
    @IsString()
    @MinLength(6, {message: 'The minimum password length is 6 characters'})
    password!: string;
}