import { Controller, Get } from '@nestjs/common';
import { DogStatusesService } from './dog-statuses.service';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { DogStatusEntity } from './dto/dog-status.entity';

@ApiTags('dogStatuses')
@ApiBearerAuth()
@Controller('dogStatuses')
export class DogStatusesController {
  constructor(private readonly dogStatusesService: DogStatusesService) {}

  @Get()
  @ApiOkResponse({ type: [DogStatusEntity] })
  findAll(): Promise<DogStatusEntity[]> {
    return this.dogStatusesService.findAll();
  }
}
