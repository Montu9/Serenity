import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { RoleEntity } from '../../role/dto/role.entity';
import { GenderEntity } from 'src/genders/dto/gender.entity';

export class CaretakerEntity {
  constructor(partial: Partial<CaretakerEntity>) {
    Object.assign(this, partial);
  }

  @ApiProperty()
  uuid: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  firstName: string;

  @ApiProperty()
  lastName: string;

  @ApiProperty()
  @Transform(({ value }) => value.name)
  gender: GenderEntity;

  @ApiProperty()
  @Transform(({ value }) => value.name)
  role: RoleEntity;
}
