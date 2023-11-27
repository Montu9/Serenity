import { PartialType } from '@nestjs/swagger';
import { CreateFeedingDto } from './create-feeding.dto';

export class UpdateFeedingDto extends PartialType(CreateFeedingDto) {}
