import { Controller } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('kennels')
@ApiBearerAuth()
@Controller('kennels')
export class KennelsController {
  constructor(private readonly kennelsService: KennelsService) {}

  // @Post()
  // create(@Body() createKennelDto: CreateKennelDto) {
  //   return this.kennelsService.create(createKennelDto);
  // }

  // @Get()
  // findAll() {
  //   return this.kennelsService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kennelsService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateKennelDto: UpdateKennelDto) {
  //   return this.kennelsService.update(+id, updateKennelDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.kennelsService.remove(+id);
  // }
}
