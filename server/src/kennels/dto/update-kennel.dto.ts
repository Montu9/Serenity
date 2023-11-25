import { PartialType } from '@nestjs/swagger';
import { CreateKennelDto } from './create-kennel.dto';

export class UpdateKennelDto extends PartialType(CreateKennelDto) {}
