import {
  Post,
  Body,
  Patch,
  Delete,
  Param,
  Get,
  UseGuards,
} from '@nestjs/common';
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
import { KennelRoleGuard, ShelterRoleGuard } from 'src/common/guards';

@ApiTags('kennels')
@ApiBearerAuth()
@Controller('kennels')
export class KennelsController {
  constructor(private readonly kennelsService: KennelsService) {}

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Post(':shelterUuid')
  @ApiCreatedResponse({ type: String })
  create(
    @Param('shelterUuid') shelterUuid: string,
    @Body() createKennelDto: CreateKennelDto,
  ) {
    return this.kennelsService.create(createKennelDto, shelterUuid);
  }

  @UseGuards(KennelRoleGuard('CARETAKER'))
  @Get(':kennelUuid/dogs')
  @ApiOkResponse({ type: [DogEntity] })
  findAllDogs(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.findAllDogs(kennelUuid);
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.kennelsService.findOne(+id);
  // }

  @UseGuards(KennelRoleGuard('ADMIN'))
  @Patch(':kennelUuid')
  @ApiOkResponse({ type: KennelEntity })
  update(
    @Param('kennelUuid') kennelUuid: string,
    @Body() updateKennelDto: UpdateKennelDto,
  ) {
    return this.kennelsService.update(kennelUuid, updateKennelDto);
  }

  @UseGuards(KennelRoleGuard('ADMIN'))
  @Delete(':kennelUuid')
  @ApiOkResponse({ type: KennelEntity })
  remove(@Param('kennelUuid') kennelUuid: string) {
    return this.kennelsService.remove(kennelUuid);
  }
}
