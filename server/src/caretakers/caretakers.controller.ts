import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { CaretakersService } from './caretakers.service';
import { CreateCaretakerByEmailDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';
import { CaretakerEntity } from './dto/caretaker.entity';
import { ShelterRoleGuard } from 'src/common/guards';

@ApiTags('caretakers')
@ApiBearerAuth()
@Controller('caretakers')
export class CaretakersController {
  constructor(private readonly caretakersService: CaretakersService) {}

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Post(':shelterUuid')
  @ApiCreatedResponse({ type: String })
  create(
    @Param('shelterUuid') shelterUuid: string,
    @Body() createCaretakerDto: CreateCaretakerByEmailDto,
  ) {
    return this.caretakersService.create(createCaretakerDto, shelterUuid);
  }

  @UseGuards(ShelterRoleGuard('CARETAKER'))
  @Get('uuid/:caretakerUuid/:shelterUuid')
  @ApiCreatedResponse({ type: CaretakerEntity })
  findOneByUuid(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
  ) {
    return this.caretakersService.findOneByUuid(caretakerUuid, shelterUuid);
  }

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Patch('uuid/:caretakerUuid/:shelterUuid')
  @ApiOkResponse({ type: String })
  update(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
    @Body() updateCaretakerDto: UpdateCaretakerDto,
  ) {
    return this.caretakersService.update(
      caretakerUuid,
      shelterUuid,
      updateCaretakerDto,
    );
  }

  @UseGuards(ShelterRoleGuard('ADMIN'))
  @Delete('uuid/:caretakerUuid/:shelterUuid')
  @ApiOkResponse({ type: String })
  remove(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
  ) {
    return this.caretakersService.remove(caretakerUuid, shelterUuid);
  }
}
