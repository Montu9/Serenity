import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class Signin {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  password: string;
}
