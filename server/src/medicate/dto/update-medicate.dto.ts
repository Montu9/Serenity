import { PartialType } from '@nestjs/swagger';
import { CreateMedicateDto } from './create-medicate.dto';

export class UpdateMedicateDto extends PartialType(CreateMedicateDto) {}
