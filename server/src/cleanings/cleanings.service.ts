import { Injectable } from '@nestjs/common';
import { CreateCleaningDto } from './dto/create-cleaning.dto';
import { UpdateCleaningDto } from './dto/update-cleaning.dto';
import { PrismaService } from 'nestjs-prisma';
import { CleaningEntity } from './dto/cleaning.entity';

@Injectable()
export class CleaningsService {
  constructor(private prisma: PrismaService) {}

  async create(createCleaningDto: CreateCleaningDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: createCleaningDto.caretakerUuid,
      },
    });

    const dog = await this.prisma.dog.findUnique({
      where: {
        uuid: createCleaningDto.dogUuid,
      },
    });
    const dataDate = createCleaningDto?.actionDate
      ? createCleaningDto?.actionDate
      : new Date();
    const cleaning = await this.prisma.cleaning.create({
      data: {
        userId: user.id,
        dogId: dog.id,
        date: dataDate,
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
    return new CleaningEntity(cleaning);
  }

  async findOne(id: number) {
    const cleaning = await this.prisma.cleaning.findUnique({
      where: { id: id },
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
    return new CleaningEntity(cleaning);
  }

  async update(id: number, updateCleaningDto: UpdateCleaningDto) {
    const cleaning = await this.prisma.cleaning.update({
      where: { id: id },
      data: {
        date: updateCleaningDto.actionDate || undefined,
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
    return new CleaningEntity(cleaning);
  }

  async remove(id: number) {
    return new CleaningEntity(
      await this.prisma.cleaning.delete({
        where: {
          id: id,
        },
      }),
    );
  }
}
