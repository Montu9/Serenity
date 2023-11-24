import { ApiProperty } from '@nestjs/swagger';
import { $Enums } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { BreedEntity } from 'src/breeds/dto/breed.entity';
import { DogConditionEntity } from 'src/dog-conditions/dto/dog-condition.entity';
import { DogStatusEntity } from 'src/dog-statuses/dto/dog-status.entity';
import { IntakeTypeEntity } from 'src/intake-types/dto/intake-types.entity';

export class DogEntity {
  constructor(partial: Partial<DogEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  name: string;
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  dateOfBirth: Date;
  @ApiProperty()
  gender: $Enums.DogGender;
  @ApiProperty()
  microchip: string;
  @ApiProperty()
  intakeDate: Date;

  @Exclude()
  dogConditionId: number;
  @ApiProperty()
  @Transform(({ value }) => value.name)
  dogCondition: DogConditionEntity;

  @Exclude()
  breedId: number;
  @ApiProperty()
  @Transform(({ value }) => value.name)
  breed: BreedEntity;

  kennelId: number;

  @Exclude()
  dogStatusId: number;
  @ApiProperty()
  @Transform(({ value }) => value.name)
  dogStatus: DogStatusEntity;

  @Exclude()
  intakeTypeId: number;
  @ApiProperty()
  @Transform(({ value }) => value.name)
  intakeType: IntakeTypeEntity;
}
