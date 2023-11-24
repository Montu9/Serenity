import { ApiProperty } from '@nestjs/swagger';
import { Kennel, Shelter } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

export class KennelEntity implements Kennel {
  constructor(partial: Partial<KennelEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  no: number;

  @ApiProperty()
  desc: string;

  @ApiProperty()
  uuid: string;

  @Exclude()
  shelterId: number;
  @ApiProperty()
  @Transform(({ value }) => value.name)
  shelter: Shelter;
}
