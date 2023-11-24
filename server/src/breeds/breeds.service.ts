import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { BreedEntity } from './dto/breed.entity';

@Injectable()
export class BreedsService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<BreedEntity[]> {
    const breeds = await this.prisma.breed.findMany();
    return breeds.map((breed) => new BreedEntity(breed));
  }
}
