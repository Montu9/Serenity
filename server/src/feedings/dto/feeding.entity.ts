import { ApiProperty } from '@nestjs/swagger';
import { Feeding } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { DogEntity } from 'src/dogs/dto/dog.entity';
import { UserEntity } from 'src/users/dto/user.entity';

export class FeedingEntity implements Feeding {
  constructor(partial: Partial<FeedingEntity>) {
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
