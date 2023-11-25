import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateKennelDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Kennel number should not be empty' })
  @IsNumber()
  no: number;

  @ApiProperty()
  @IsNotEmpty({ message: 'Description should not be empty' })
  @IsString({ message: 'Description should be a string' })
  desc: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Shelter name should not be empty' })
  @IsString({ message: 'Shelter name should be a string' })
  shelter: string;
}
