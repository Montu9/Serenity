import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';
import { MatchPasswd } from 'src/common/decorators/classValidatorD/MatchPasswd.decorator';
export class Signup {
  @ApiProperty()
  @IsEmail({}, { message: 'Invalid email format' })
  @IsNotEmpty({ message: 'Email cannot be empty' })
  email: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have at least 8 characters (upper, lower case letter, digits and special).',
  })
  password: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Confirmation password cannot be empty' })
  @MatchPasswd('password', { message: 'Passwords must be identical' })
  passwordConfirm: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Firstname cannot be empty' })
  firstName: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Lastname cannot be empty' })
  lastName: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Gender cannot be empty' })
  gender: string;
}
