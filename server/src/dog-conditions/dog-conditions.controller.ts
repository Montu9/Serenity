import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DogConditionsService } from './dog-conditions.service';
import { DogConditionEntity } from './dto/dog-condition.entity';

@ApiTags('dogConditions')
@ApiBearerAuth()
@Controller('dogConditions')
export class DogConditionsController {
  constructor(private readonly dogConditionsService: DogConditionsService) {}

  @Get()
  @ApiOkResponse({ type: [DogConditionEntity] })
  findAll(): Promise<DogConditionEntity[]> {
    return this.dogConditionsService.findAll();
  }
}
