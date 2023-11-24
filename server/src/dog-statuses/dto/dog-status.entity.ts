import { ApiProperty } from '@nestjs/swagger';
import { DogStatus } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class DogStatusEntity implements DogStatus {
  constructor(partial: Partial<DogStatusEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  name: string;
}
