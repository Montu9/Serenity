import { PartialType } from '@nestjs/swagger';
import { CreateCaretakerByEmailDto } from './create-caretaker.dto';

export class UpdateCaretakerDto extends PartialType(
  CreateCaretakerByEmailDto,
) {}
