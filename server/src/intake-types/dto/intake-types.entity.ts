import { ApiProperty } from '@nestjs/swagger';
import { IntakeType } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class IntakeTypeEntity implements IntakeType {
  constructor(partial: Partial<IntakeTypeEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  name: string;
}
