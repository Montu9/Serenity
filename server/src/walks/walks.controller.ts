import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { WalksService } from './walks.service';
import { CreateWalkDto } from './dto/create-walk.dto';
import { UpdateWalkDto } from './dto/update-walk.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { WalkEntity } from './dto/walk.entity';

@ApiTags('walks')
@ApiBearerAuth()
@Controller('walks')
export class WalksController {
  constructor(private readonly walksService: WalksService) {}

  @Post()
  @ApiCreatedResponse({ type: WalkEntity })
  create(@Body() createWalkDto: CreateWalkDto) {
    return this.walksService.create(createWalkDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.walksService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWalkDto: UpdateWalkDto) {
    return this.walksService.update(+id, updateWalkDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.walksService.remove(+id);
  }
}
