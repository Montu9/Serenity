import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DogsService } from './dogs.service';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DogEntity } from './dto/dog.entity';
import { CleaningEntity } from 'src/cleanings/dto/cleaning.entity';
import { MedicateEntity } from 'src/medicate/dto/medicate.entity';
import { FeedingEntity } from 'src/feedings/dto/feeding.entity';
import { WalkEntity } from 'src/walks/dto/walk.entity';
import { DogRoleGuard, KennelRoleGuard } from 'src/common/guards';

@ApiTags('dogs')
@ApiBearerAuth()
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @UseGuards(KennelRoleGuard('ADMIN'))
  @Post(':kennelUuid')
  @ApiCreatedResponse({ type: DogEntity })
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  // @Get()
  // findAll() {
  //   return this.dogsService.findAll();
  // }

  @UseGuards(DogRoleGuard('CARETAKER'))
  @Get(':dogUuid/cleanings')
  @ApiOkResponse({ type: [CleaningEntity] })
  getAllCleanings(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.getAllCleanings(dogUuid);
  }

  @UseGuards(DogRoleGuard('CARETAKER'))
  @Get(':dogUuid/feedings')
  @ApiOkResponse({ type: [FeedingEntity] })
  getAllFeedings(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.getAllFeedings(dogUuid);
  }

  @UseGuards(DogRoleGuard('CARETAKER'))
  @Get(':dogUuid/medicate')
  @ApiOkResponse({ type: [MedicateEntity] })
  getAllMedicate(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.getAllMedicate(dogUuid);
  }

  @UseGuards(DogRoleGuard('CARETAKER'))
  @Get(':dogUuid/walks')
  @ApiOkResponse({ type: [WalkEntity] })
  getAllWalks(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.getAllWalks(dogUuid);
  }

  @UseGuards(DogRoleGuard('CARETAKER'))
  @Get(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  findOne(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.findOne(dogUuid);
  }

  @UseGuards(DogRoleGuard('ADMIN'))
  @Patch(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  update(
    @Param('dogUuid') dogUuid: string,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    return this.dogsService.update(dogUuid, updateDogDto);
  }

  @UseGuards(DogRoleGuard('ADMIN'))
  @Delete(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  remove(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.remove(dogUuid);
  }
}
