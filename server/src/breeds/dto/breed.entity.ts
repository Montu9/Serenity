import { ApiProperty } from '@nestjs/swagger';
import { Breed } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class BreedEntity implements Breed {
  constructor(partial: Partial<BreedEntity>) {
    Object.assign(this, partial);
  }
  @Exclude()
  id: number;

  @ApiProperty()
  url: string;

  @ApiProperty()
  image: string;

  @ApiProperty()
  pdf: string;

  @ApiProperty()
  name: string;
}
