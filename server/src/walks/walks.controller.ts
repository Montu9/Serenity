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
import { WalksService } from './walks.service';
import { CreateWalkDto } from './dto/create-walk.dto';
import { UpdateWalkDto } from './dto/update-walk.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { WalkEntity } from './dto/walk.entity';
import { ActionRoleGuard } from 'src/common/guards/actionRole.guard';
import { WalkSubGuard } from 'src/common/guards/walkSub.guard';

@ApiTags('walks')
@ApiBearerAuth()
@Controller('walks')
export class WalksController {
  constructor(private readonly walksService: WalksService) {}

  @UseGuards(ActionRoleGuard('CARETAKER'))
  @Post()
  @ApiCreatedResponse({ type: WalkEntity })
  create(@Body() createWalkDto: CreateWalkDto) {
    return this.walksService.create(createWalkDto);
  }

  @UseGuards(WalkSubGuard())
  @Get(':actionId')
  findOne(@Param('actionId') actionId: string) {
    return this.walksService.findOne(+actionId);
  }

  @UseGuards(WalkSubGuard())
  @Patch(':actionId')
  update(
    @Param('actionId') actionId: string,
    @Body() updateWalkDto: UpdateWalkDto,
  ) {
    return this.walksService.update(+actionId, updateWalkDto);
  }

  @UseGuards(WalkSubGuard())
  @Delete(':actionId')
  remove(@Param('actionId') actionId: string) {
    return this.walksService.remove(+actionId);
  }
}
