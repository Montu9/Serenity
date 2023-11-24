import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { GenderEntity } from './dto/gender.entity';

@Injectable()
export class GendersService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<GenderEntity[]> {
    const genders = await this.prisma.gender.findMany();
    return genders.map((gender) => new GenderEntity(gender));
  }
}
