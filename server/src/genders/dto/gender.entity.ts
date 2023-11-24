import { ApiProperty } from '@nestjs/swagger';
import { Gender } from '@prisma/client';
import { Exclude } from 'class-transformer';

export class GenderEntity implements Gender {
  constructor(partial: Partial<GenderEntity>) {
    Object.assign(this, partial);
  }

  @Exclude()
  id: number;

  @ApiProperty()
  name: string;
}
