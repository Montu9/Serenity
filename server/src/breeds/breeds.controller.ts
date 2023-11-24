import { Controller, Get } from '@nestjs/common';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { BreedsService } from './breeds.service';
import { BreedEntity } from './dto/breed.entity';

@ApiTags('breeds')
@ApiBearerAuth()
@Controller('breeds')
export class BreedsController {
  constructor(private readonly breedsService: BreedsService) {}

  @Get()
  @ApiOkResponse({ type: [BreedEntity] })
  findAll(): Promise<BreedEntity[]> {
    return this.breedsService.findAll();
  }
}
