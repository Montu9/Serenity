import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from 'src/role/dto/role.entity';
import { ShelterEntity } from 'src/shelters/dto/shelter.entity';

export class GetUserShelters {
  constructor(partialShelter: ShelterEntity, partialRole: RoleEntity) {
    this.shelter = new ShelterEntity(partialShelter);
    this.role = new RoleEntity(partialRole);
  }
  @ApiProperty()
  shelter: ShelterEntity;

  @ApiProperty()
  role: RoleEntity;
}
