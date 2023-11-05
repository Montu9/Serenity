import { PartialType } from '@nestjs/swagger';
import { Signup } from 'src/auth/dto';

export class UpdateUserDto extends PartialType(Signup) {}
