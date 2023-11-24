import { Injectable } from '@nestjs/common';
import { DogStatusEntity } from './dto/dog-status.entity';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class DogStatusesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<DogStatusEntity[]> {
    const dogStatuses = await this.prisma.dogStatus.findMany();
    return dogStatuses.map((dogStatus) => new DogStatusEntity(dogStatus));
  }
}
