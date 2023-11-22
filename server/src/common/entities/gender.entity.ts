import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class GenderEntity {
  constructor(partial: Partial<GenderEntity>) {
    Object.assign(this, partial);
  }
  @Exclude()
  id?: number;

  @ApiProperty()
  name?: string;
}
