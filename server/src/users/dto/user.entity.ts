import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';
import { GenderEntity } from 'src/genders/dto/gender.entity';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @Exclude()
  passwdHash: string;

  @ApiProperty()
  isActive: boolean;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @Exclude()
  genderId: number;

  @ApiProperty()
  @Transform(({ value }) => value.name)
  gender: GenderEntity;
}
