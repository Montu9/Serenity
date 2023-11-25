import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
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

@ApiTags('dogs')
@ApiBearerAuth()
@Controller('dogs')
export class DogsController {
  constructor(private readonly dogsService: DogsService) {}

  @Post()
  @ApiCreatedResponse({ type: DogEntity })
  create(@Body() createDogDto: CreateDogDto) {
    return this.dogsService.create(createDogDto);
  }

  @Get()
  findAll() {
    return this.dogsService.findAll();
  }

  @Get(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  findOne(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.findOne(dogUuid);
  }

  @Patch(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  update(
    @Param('dogUuid') dogUuid: string,
    @Body() updateDogDto: UpdateDogDto,
  ) {
    return this.dogsService.update(dogUuid, updateDogDto);
  }

  @Delete(':dogUuid')
  @ApiOkResponse({ type: DogEntity })
  remove(@Param('dogUuid') dogUuid: string) {
    return this.dogsService.remove(dogUuid);
  }
}
