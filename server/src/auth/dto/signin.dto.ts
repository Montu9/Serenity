import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Signin {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
