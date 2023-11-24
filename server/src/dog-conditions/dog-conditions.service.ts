import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { DogConditionEntity } from './dto/dog-condition.entity';

@Injectable()
export class DogConditionsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<DogConditionEntity[]> {
    const dogConditions = await this.prisma.dogCondition.findMany();
    return dogConditions.map((condition) => new DogConditionEntity(condition));
  }
}
