import { Post, Body, Patch, Delete, Param, Get } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { KennelsService } from './kennels.service';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CreateKennelDto } from './dto/create-kennel.dto';
import { UpdateKennelDto } from './dto/update-kennel.dto';
import { KennelEntity } from './dto/kennel.entity';
import { DogEntity } from 'src/dogs/dto/dog.entity';

@ApiTags('kennels')
@ApiBearerAuth()
@Controller('kennels')
export class KennelsController {
  constructor(private readonly kennelsService: KennelsService) {}

  @Post(':shelterUuid')
  @ApiCreatedResponse({ type: String })
  create(
    @Param('shelterUuid') shelterUuid: string,
    @Body() createKennelDto: CreateKennelDto,
  ) {
    return this.kennelsService.create(createKennelDto, shelterUuid);
  }

  @Get('getAllDogs/:kennelUuid')
  @ApiOkResponse({ type: [DogEntity] })
  findAllDogs(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.findAllDogs(kennelUuid);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kennelsService.findOne(+id);
  // }

  @Patch(':kennelUuid')
  @ApiOkResponse({ type: KennelEntity })
  update(
    @Param('kennelUuid') kennelUuid: string,
    @Body() updateKennelDto: UpdateKennelDto,
  ) {
    return this.kennelsService.update(kennelUuid, updateKennelDto);
  }

  @Delete(':kennelUuid')
  @ApiOkResponse({ type: KennelEntity })
  remove(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.remove(kennelUuid);
  }
}
