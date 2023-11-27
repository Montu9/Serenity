import { Injectable } from '@nestjs/common';
import { CreateFeedingDto } from './dto/create-feeding.dto';
import { UpdateFeedingDto } from './dto/update-feeding.dto';
import { PrismaService } from 'nestjs-prisma';
import { FeedingEntity } from './dto/feeding.entity';

@Injectable()
export class FeedingsService {
  constructor(private prisma: PrismaService) {}

  async create(createFeedingDto: CreateFeedingDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: createFeedingDto.caretakerUuid,
      },
    });

    const dog = await this.prisma.dog.findUnique({
      where: {
        uuid: createFeedingDto.dogUuid,
      },
    });

    const dataDate = createFeedingDto?.actionDate
      ? createFeedingDto?.actionDate
      : new Date();

    const feeding = await this.prisma.feeding.create({
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

    return new FeedingEntity(feeding);
  }

  async findOne(id: number) {
    const feeding = await this.prisma.feeding.findUnique({
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

    return new FeedingEntity(feeding);
  }

  async update(id: number, updateFeedingDto: UpdateFeedingDto) {
    const feeding = await this.prisma.feeding.update({
      where: { id: id },
      data: {
        date: updateFeedingDto.actionDate || undefined,
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
    return new FeedingEntity(feeding);
  }

  async remove(id: number) {
    return new FeedingEntity(
      await this.prisma.feeding.delete({
        where: {
          id: id,
        },
      }),
    );
  }
}
