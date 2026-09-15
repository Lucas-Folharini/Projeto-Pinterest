import { IsNotEmpty, IsString, IsEmail, IsISO8601 } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  id!: string;

  @IsNotEmpty()
  @IsString()
  userName!: string;

  @IsNotEmpty()
  @IsEmail()
  email!: string;

  @IsNotEmpty()
  @IsString()
  password!: string;

  @IsNotEmpty()
  @IsISO8601()
  birthDate!: string;
}
