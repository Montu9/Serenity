import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { GenderEntity } from 'src/genders/dto/gender.entity';
import { RoleEntity } from 'src/role/dto/role.entity';
import { UserEntity } from 'src/users/dto/user.entity';

export class CaretakerEntity extends UserEntity {
  constructor(partial: Partial<CaretakerEntity>) {
    super(partial);
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
  gender: GenderEntity;

  @ApiProperty()
  @Transform(({ value }) => value.name)
  role: RoleEntity;
}
