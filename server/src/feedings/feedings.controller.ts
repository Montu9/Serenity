import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FeedingsService } from './feedings.service';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { FeedingEntity } from './dto/feeding.entity';

@ApiTags('feedings')
@ApiBearerAuth()
@Controller('feedings')
export class FeedingsController {
  constructor(private readonly feedingsService: FeedingsService) {}

  @Post()
  @ApiCreatedResponse({ type: FeedingEntity })
  create(@Body() createFeedingDto: CreateFeedingDto) {
    return this.feedingsService.create(createFeedingDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.feedingsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFeedingDto: UpdateFeedingDto) {
    return this.feedingsService.update(+id, updateFeedingDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.feedingsService.remove(+id);
  }
}
