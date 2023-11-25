import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { IsDateString, IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class CreateDogDto {
  @ApiProperty()
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Date of birth should not be empty' })
  @IsDateString({}, { message: 'Invalid date format for date of birth' })
  dateOfBirth: Date;

  @ApiProperty()
  @IsEnum($Enums.DogGender, { message: 'Invalid dog gender' })
  gender: $Enums.DogGender;

  @ApiProperty()
  @IsNotEmpty({ message: 'Microchip should not be empty' })
  @IsString({ message: 'Microchip should be a string' })
  microchip: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Intake date should not be empty' })
  @IsDateString({}, { message: 'Invalid date format for intake date' })
  intakeDate: Date;

  @ApiProperty()
  @IsNotEmpty({ message: 'Dog condition should not be empty' })
  @IsString({ message: 'Dog condition should be a string' })
  dogCondition: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Breed should not be empty' })
  @IsString({ message: 'Breed should be a string' })
  breed: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Kennel should not be empty' })
  @IsString({ message: 'Kennel should be a string' })
  kennel: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Dog status should not be empty' })
  @IsString({ message: 'Dog status should be a string' })
  dogStatus: string;

  @ApiProperty()
  @IsNotEmpty({ message: 'Intake type should not be empty' })
  @IsString({ message: 'Intake type should be a string' })
  intakeType: string;
}
