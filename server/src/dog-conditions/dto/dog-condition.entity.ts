import { ApiProperty } from '@nestjs/swagger';
import { DogCondition } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class DogConditionEntity implements DogCondition {
  constructor(partial: Partial<DogConditionEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  name: string;
}
