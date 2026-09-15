import { IsEmail, IsNotEmpty, IsString, IsISO8601 } from 'class-validator';

export class CreateUserDTO {
  @IsString()
  @IsNotEmpty()
  userName!: string;

  @IsEmail()
  email!: string;

  @IsString()
  @IsNotEmpty()
  password!: string;

  @IsNotEmpty()
  @IsISO8601()
  birthDate!: string;
}
