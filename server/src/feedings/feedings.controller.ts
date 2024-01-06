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
import { FeedingsService } from './feedings.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FeedingEntity } from './dto/feeding.entity';
import { ActionRoleGuard } from 'src/common/guards/actionRole.guard';
import { FeedingSubGuard } from 'src/common/guards';

@ApiTags('feedings')
@ApiBearerAuth()
@Controller('feedings')
export class FeedingsController {
  constructor(private readonly feedingsService: FeedingsService) {}

  @UseGuards(ActionRoleGuard('CARETAKER'))
  @Post()
  @ApiCreatedResponse({ type: FeedingEntity })
  create(@Body() createFeedingDto: CreateFeedingDto) {
    return this.feedingsService.create(createFeedingDto);
  }

  @UseGuards(FeedingSubGuard())
  @Get(':actionId')
  findOne(@Param('actionId') actionId: string) {
    return this.feedingsService.findOne(+actionId);
  }

  @UseGuards(FeedingSubGuard())
  @Patch(':actionId')
  update(
    @Param('actionId') actionId: string,
    @Body() updateFeedingDto: UpdateFeedingDto,
  ) {
    return this.feedingsService.update(+actionId, updateFeedingDto);
  }

  @UseGuards(FeedingSubGuard())
  @Delete(':actionId')
  remove(@Param('actionId') actionId: string) {
    return this.feedingsService.remove(+actionId);
  }
}
