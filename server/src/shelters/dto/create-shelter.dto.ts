import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateShelterDto {
  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Name cannot be empty' })
  name: string;

  @ApiProperty()
  @IsString({ message: 'Invalid text' })
  @IsNotEmpty({ message: 'Description cannot be empty' })
  description: string;
}
