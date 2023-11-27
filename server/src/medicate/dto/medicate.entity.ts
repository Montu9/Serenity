import { ApiProperty } from '@nestjs/swagger';
import { Medicate } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { DogEntity } from 'src/dogs/dto/dog.entity';
import { UserEntity } from 'src/users/dto/user.entity';

export class MedicateEntity implements Medicate {
  constructor(partial: Partial<MedicateEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  id: number;

  @ApiProperty()
  date: Date;

  @Exclude()
  userId: number;
  @ApiProperty()
  @Transform(({ value }) => new UserEntity(value))
  user: UserEntity;

  @Exclude()
  dogId: number;
  @ApiProperty()
  @Transform(({ value }) => new DogEntity(value))
  dog: DogEntity;
}
