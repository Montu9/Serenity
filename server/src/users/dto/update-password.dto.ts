import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches } from 'class-validator';
import { MatchPasswd } from 'src/common/decorators/classValidatorD/MatchPasswd.decorator';

export class UpdatePasswordDto {
  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  @Matches(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/, {
    message:
      'Password should have at least 8 characters (upper, lower case letter, digits and special).',
  })
  newPassword: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Confirmation password cannot be empty' })
  @MatchPasswd('newPassword', { message: 'Passwords must be identical' })
  newPasswordConfirm: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Password cannot be empty' })
  oldPassword: string;
}
