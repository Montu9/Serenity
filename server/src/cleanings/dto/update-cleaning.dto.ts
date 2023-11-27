import { PartialType } from '@nestjs/swagger';
import { CreateCleaningDto } from './create-cleaning.dto';

export class UpdateCleaningDto extends PartialType(CreateCleaningDto) {}
