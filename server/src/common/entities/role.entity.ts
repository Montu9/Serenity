import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class RoleEntity {
  constructor(partial: Partial<RoleEntity>) {
    Object.assign(this, partial);
  }
  @Exclude()
  id?: number;

  @ApiProperty()
  name?: string;
}
