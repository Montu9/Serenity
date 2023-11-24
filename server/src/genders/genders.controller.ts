import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { GendersService } from './genders.service';
import { GenderEntity } from './dto/gender.entity';

@ApiTags('genders')
@ApiBearerAuth()
@Controller('genders')
export class GendersController {
  constructor(private readonly gendersService: GendersService) {}

  @Get()
  @ApiOkResponse({ type: [GenderEntity] })
  findAll(): Promise<GenderEntity[]> {
    return this.gendersService.findAll();
  }
}
