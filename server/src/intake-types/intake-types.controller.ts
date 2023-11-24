import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { IntakeTypeEntity } from './dto/intake-types.entity';
import { IntakeTypesService } from './intake-types.service';

@ApiTags('intakeTypes')
@ApiBearerAuth()
@Controller('intakeTypes')
export class IntakeTypesController {
  constructor(private readonly intakeTypesService: IntakeTypesService) {}

  @Get()
  @ApiOkResponse({ type: [IntakeTypeEntity] })
  findAll(): Promise<IntakeTypeEntity[]> {
    return this.intakeTypesService.findAll();
  }
}
