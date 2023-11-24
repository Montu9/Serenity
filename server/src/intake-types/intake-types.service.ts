import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { IntakeTypeEntity } from './dto/intake-types.entity';

@Injectable()
export class IntakeTypesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<IntakeTypeEntity[]> {
    const intakeTypes = await this.prisma.intakeType.findMany();
    return intakeTypes.map((intakeType) => new IntakeTypeEntity(intakeType));
  }
}
