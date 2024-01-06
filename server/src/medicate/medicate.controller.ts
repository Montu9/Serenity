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
import { MedicateService } from './medicate.service';
import { CreateMedicateDto } from './dto/create-medicate.dto';
import { UpdateMedicateDto } from './dto/update-medicate.dto';
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { MedicateEntity } from './dto/medicate.entity';
import { ActionRoleGuard } from 'src/common/guards/actionRole.guard';
import { MedicateSubGuard } from 'src/common/guards';

@ApiTags('medicate')
@ApiBearerAuth()
@Controller('medicate')
export class MedicateController {
  constructor(private readonly medicateService: MedicateService) {}

  @UseGuards(ActionRoleGuard('CARETAKER'))
  @Post()
  @ApiCreatedResponse({ type: MedicateEntity })
  create(@Body() createMedicateDto: CreateMedicateDto) {
    return this.medicateService.create(createMedicateDto);
  }

  @UseGuards(MedicateSubGuard())
  @Get(':actionId')
  findOne(@Param('actionId') actionId: string) {
    return this.medicateService.findOne(+actionId);
  }

  @UseGuards(MedicateSubGuard())
  @Patch(':actionId')
  update(
    @Param('actionId') actionId: string,
    @Body() updateMedicateDto: UpdateMedicateDto,
  ) {
    return this.medicateService.update(+actionId, updateMedicateDto);
  }

  @UseGuards(MedicateSubGuard())
  @Delete(':actionId')
  remove(@Param('actionId') actionId: string) {
    return this.medicateService.remove(+actionId);
  }
}
