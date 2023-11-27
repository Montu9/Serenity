import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CleaningsService } from './cleanings.service';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CleaningEntity } from './dto/cleaning.entity';

@ApiTags('cleanings')
@ApiBearerAuth()
@Controller('cleanings')
export class CleaningsController {
  constructor(private readonly cleaningsService: CleaningsService) {}

  @Post()
  @ApiCreatedResponse({ type: CleaningEntity })
  async create(@Body() createCleaningDto: CreateCleaningDto) {
    return this.cleaningsService.create(createCleaningDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cleaningsService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCleaningDto: UpdateCleaningDto,
  ) {
    return this.cleaningsService.update(+id, updateCleaningDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cleaningsService.remove(+id);
  }
}
