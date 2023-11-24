import { ApiProperty } from '@nestjs/swagger';
import { Shelter } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class ShelterEntity implements Shelter {
  constructor(partial: Partial<ShelterEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;
  @ApiProperty()
  description: string;
  @ApiProperty()
  createdAt: Date;
  @ApiProperty()
  updatedAt: Date;
  @ApiProperty()
  uuid: string;
  @ApiProperty()
  name: string;
}
