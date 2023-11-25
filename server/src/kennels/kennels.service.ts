import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'nestjs-prisma';
import { CreateKennelDto } from './dto/create-kennel.dto';
import { KennelEntity } from './dto/kennel.entity';
import { UpdateKennelDto } from './dto/update-kennel.dto';
import { DogEntity } from 'src/dogs/dto/dog.entity';

@Injectable()
export class KennelsService {
  constructor(private prisma: PrismaService) {}

  async create(createKennelDto: CreateKennelDto) {
    const uuid = nanoid();
    const kennel = await this.prisma.kennel.create({
      data: {
        no: createKennelDto.no,
        desc: createKennelDto.desc,
        uuid: uuid,
        shelter: {
          connect: {
            uuid: createKennelDto.shelter,
          },
        },
      },
    });

    return new KennelEntity(kennel);
  }

  async findAllDogs(kennelUuid: string) {
    const dogs = await this.prisma.dog.findMany({
      where: {
        kennel: {
          uuid: kennelUuid,
        },
      },
      include: {
        breed: true,
        kennel: {
          include: {
            shelter: true,
          },
        },
        dogCondition: true,
        dogStatus: true,
        intake: true,
      },
    });
    return dogs.map((dog) => new DogEntity(dog));
  }
  // findOne(id: number) {
  //   return `This action returns a #${id} kennel`;
  // }
  async update(kennelUuid: string, updateKennelDto: UpdateKennelDto) {
    const shelter = updateKennelDto.shelter
      ? await this.prisma.shelter.findFirst({
          where: { uuid: updateKennelDto.shelter },
        })
      : undefined;

    const kennel = await this.prisma.kennel.update({
      where: { uuid: kennelUuid },
      data: {
        no: updateKennelDto.no || undefined,
        desc: updateKennelDto.desc || undefined,
        shelterId: shelter?.id || undefined,
      },
    });

    return new KennelEntity(kennel);
  }

  async remove(kennelUuid: string) {
    return new KennelEntity(
      await this.prisma.kennel.delete({ where: { uuid: kennelUuid } }),
    );
  }
}
