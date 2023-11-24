import { Controller, Get } from '@nestjs/common';
import { RoleService } from './role.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { RoleEntity } from './dto/role.entity';

@ApiTags('role')
@ApiBearerAuth()
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiOkResponse({ type: [RoleEntity] })
  findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }
}
