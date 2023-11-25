import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
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

@ApiTags('caretakers')
@ApiBearerAuth()
@Controller('caretakers')
export class CaretakersController {
  constructor(private readonly caretakersService: CaretakersService) {}

  @Post(':shelterUuid')
  @ApiCreatedResponse({ type: String })
  create(
    @Param('shelterUuid') shelterUuid: string,
    @Body() createCaretakerDto: CreateCaretakerByEmailDto,
  ): Promise<string> {
    return this.caretakersService.create(createCaretakerDto, shelterUuid);
  }

  @Get(':caretakerUuid/getByUuid/:shelterUuid')
  @ApiCreatedResponse({ type: CaretakerEntity })
  findOneByUuid(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
  ) {
    return this.caretakersService.findOneByUuid(caretakerUuid, shelterUuid);
  }

  @Patch(':caretakerUuid/updateByUuid/:shelterUuid')
  @ApiOkResponse({ type: String })
  update(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
    @Body() updateCaretakerDto: UpdateCaretakerDto,
  ): Promise<string> {
    return this.caretakersService.update(
      caretakerUuid,
      shelterUuid,
      updateCaretakerDto,
    );
  }

  @Delete(':caretakerUuid/removeByUuid/:shelterUuid')
  @ApiOkResponse({ type: String })
  remove(
    @Param('caretakerUuid') caretakerUuid: string,
    @Param('shelterUuid') shelterUuid: string,
  ) {
    return this.caretakersService.remove(caretakerUuid, shelterUuid);
  }
}
