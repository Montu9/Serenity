import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SheltersService } from './shelters.service';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { GetCurrentUserUuid } from 'src/common/decorators';
import { CaretakerEntity } from 'src/common/entities/caretaker.entity';

@Controller('shelters')
export class SheltersController {
  constructor(private readonly sheltersService: SheltersService) {}

  @Post()
  create(
    @Body() createShelterDto: CreateShelterDto,
    @GetCurrentUserUuid() userUuid: string,
  ) {
    return this.sheltersService.create(createShelterDto, userUuid);
  }

  @Get()
  findAll() {
    return this.sheltersService.findAll();
  }

  @Get('getAllCaretakers/:id')
  getAllCaretakers(@Param('id') id: string): Promise<CaretakerEntity[]> {
    return this.sheltersService.getAllCaretakers(id);
  }

  @Get('getUserShelters')
  getUserShelters(@GetCurrentUserUuid() userUuid: string) {
    return this.sheltersService.getUserShelters(userUuid);
  }

  @Post('addCaretakerByEmail/:id')
  addCaretakerByEmail(
    @Param('id') id: string,
    @Body() addByEmail: { email: string },
  ) {
    return this.sheltersService.addCaretakerByEmail(id, addByEmail);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sheltersService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShelterDto: UpdateShelterDto) {
    return this.sheltersService.update(+id, updateShelterDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sheltersService.remove(+id);
  }
}
