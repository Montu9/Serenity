import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MedicateService } from './medicate.service';
import { CreateMedicateDto } from './dto/create-medicate.dto';
import { UpdateMedicateDto } from './dto/update-medicate.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MedicateEntity } from './dto/medicate.entity';

@ApiTags('medicate')
@ApiBearerAuth()
@Controller('medicate')
export class MedicateController {
  constructor(private readonly medicateService: MedicateService) {}

  @Post()
  @ApiCreatedResponse({ type: MedicateEntity })
  create(@Body() createMedicateDto: CreateMedicateDto) {
    return this.medicateService.create(createMedicateDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.medicateService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateMedicateDto: UpdateMedicateDto,
  ) {
    return this.medicateService.update(+id, updateMedicateDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.medicateService.remove(+id);
  }
}
