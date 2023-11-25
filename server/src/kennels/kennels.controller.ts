import { Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CreateKennelDto } from './dto/create-kennel.dto';
import { UpdateKennelDto } from './dto/update-kennel.dto';

@ApiTags('kennels')
@ApiBearerAuth()
@Controller('kennels')
export class KennelsController {
  constructor(private readonly kennelsService: KennelsService) {}

  @Post()
  @ApiCreatedResponse({ type: String })
  create(@Body() createKennelDto: CreateKennelDto) {
    return this.kennelsService.create(createKennelDto);
  }

  @Get(':kennelUuid')
  findAllDogs(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.findAllDogs(kennelUuid);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kennelsService.findOne(+id);
  // }

  @Patch(':kennelUuid')
  update(
    @Param('kennelUuid') kennelUuid: string,
    @Body() updateKennelDto: UpdateKennelDto,
  ) {
    return this.kennelsService.update(kennelUuid, updateKennelDto);
  }

  @Delete(':kennelUuid')
  remove(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.remove(kennelUuid);
  }
}
