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
import { CleaningsService } from './cleanings.service';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CleaningEntity } from './dto/cleaning.entity';
import { ActionRoleGuard } from 'src/common/guards/actionRole.guard';
import { CleaningSubGuard } from 'src/common/guards';

@ApiTags('cleanings')
@ApiBearerAuth()
@Controller('cleanings')
export class CleaningsController {
  constructor(private readonly cleaningsService: CleaningsService) {}

  @UseGuards(ActionRoleGuard('CARETAKER'))
  @Post()
  @ApiCreatedResponse({ type: CleaningEntity })
  async create(@Body() createCleaningDto: CreateCleaningDto) {
    return this.cleaningsService.create(createCleaningDto);
  }

  @UseGuards(CleaningSubGuard())
  @Get(':actionId')
  findOne(@Param('actionId') actionId: string) {
    return this.cleaningsService.findOne(+actionId);
  }

  @UseGuards(CleaningSubGuard())
  @Patch(':actionId')
  update(
    @Param('actionId') actionId: string,
    @Body() updateCleaningDto: UpdateCleaningDto,
  ) {
    return this.cleaningsService.update(+actionId, updateCleaningDto);
  }

  @UseGuards(CleaningSubGuard())
  @Delete(':actionId')
  remove(@Param('actionId') actionId: string) {
    return this.cleaningsService.remove(+actionId);
  }
}
