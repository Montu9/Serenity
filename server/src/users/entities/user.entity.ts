import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class UserEntity implements User {
  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @Exclude()
  createdAt: Date;

  @Exclude()
  updatedAt: Date;

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @Exclude()
  passwdHash: string;

  @Exclude()
  rtHash: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  genderId: number;
}
