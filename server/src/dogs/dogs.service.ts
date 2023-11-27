import { Injectable } from '@nestjs/common';
import { CreateDogDto } from './dto/create-dog.dto';
import { UpdateDogDto } from './dto/update-dog.dto';
import { PrismaService } from 'nestjs-prisma';
import { DogEntity } from './dto/dog.entity';
import { nanoid } from 'nanoid';
import { CleaningEntity } from 'src/cleanings/dto/cleaning.entity';

@Injectable()
export class DogsService {
  constructor(private prisma: PrismaService) {}

  async create(createDogDto: CreateDogDto) {
    const uuid = nanoid();
    const dog = await this.prisma.dog.create({
      data: {
        uuid: uuid,
        name: createDogDto.name,
        dateOfBirth: createDogDto.dateOfBirth,
        gender: createDogDto.gender,
        microchip: createDogDto.microchip,
        intakeDate: createDogDto.intakeDate,
        dogCondition: {
          connect: {
            name: createDogDto.dogCondition,
          },
        },
        breed: {
          connect: {
            name: createDogDto.breed,
          },
        },
        kennel: {
          connect: {
            uuid: createDogDto.kennel,
          },
        },
        dogStatus: {
          connect: {
            name: createDogDto.dogStatus,
          },
        },
        intake: {
          connect: {
            name: createDogDto.intakeType,
          },
        },
      },
    });
    return new DogEntity(dog);
  }

  async getAllCleanings(dogUuid: string) {
    const cleanings = await this.prisma.cleaning.findMany({
      where: {
        dog: {
          uuid: dogUuid,
        },
      },
      include: {
        user: {
          include: {
            gender: true,
          },
        },
        dog: {
          include: {
            kennel: {
              include: {
                shelter: true,
              },
            },
            breed: true,
            dogCondition: true,
            dogStatus: true,
            intake: true,
          },
        },
      },
    });
    return cleanings.map((cleaning) => new CleaningEntity(cleaning));
  }

  findAll() {
    return `This action returns all dogs`;
  }

  async findOne(dogUuid: string) {
    const dog = await this.prisma.dog.findUnique({
      where: { uuid: dogUuid },
    });

    return new DogEntity(dog);
  }

  async update(dogUuid: string, updateDogDto: UpdateDogDto) {
    const dogCondition = updateDogDto.dogCondition
      ? await this.prisma.dogCondition.findFirst({
          where: { name: updateDogDto.dogCondition },
        })
      : undefined;

    const breed = updateDogDto.breed
      ? await this.prisma.breed.findFirst({
          where: { name: updateDogDto.breed },
        })
      : undefined;

    const kennel = updateDogDto.kennel
      ? await this.prisma.breed.findFirst({
          where: { name: updateDogDto.kennel },
        })
      : undefined;

    const dogStatus = updateDogDto.dogStatus
      ? await this.prisma.breed.findFirst({
          where: { name: updateDogDto.dogStatus },
        })
      : undefined;

    const intakeType = updateDogDto.intakeType
      ? await this.prisma.intakeType.findFirst({
          where: { name: updateDogDto.intakeType },
        })
      : undefined;

    const dog = await this.prisma.dog.update({
      where: {
        uuid: dogUuid,
      },
      data: {
        name: updateDogDto?.name || undefined,
        dateOfBirth: updateDogDto?.dateOfBirth || undefined,
        gender: updateDogDto?.gender || undefined,
        microchip: updateDogDto?.microchip || undefined,
        intakeDate: updateDogDto?.intakeDate || undefined,
        dogConditionId: dogCondition?.id || undefined,
        breedId: breed?.id || undefined,
        kennelId: kennel?.id || undefined,
        dogStatusId: dogStatus?.id || undefined,
        intakeTypeId: intakeType?.id || undefined,
      },
    });

    return new DogEntity(dog);
  }

  async remove(dogUuid: string) {
    return new DogEntity(
      await this.prisma.dog.delete({ where: { uuid: dogUuid } }),
    );
  }
}
