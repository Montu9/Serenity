import { Injectable } from '@nestjs/common';
import { CreateWalkDto } from './dto/create-walk.dto';
import { UpdateWalkDto } from './dto/update-walk.dto';
import { PrismaService } from 'nestjs-prisma';
import { WalkEntity } from './dto/walk.entity';

@Injectable()
export class WalksService {
  constructor(private prisma: PrismaService) {}

  async create(createWalkDto: CreateWalkDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: createWalkDto.caretakerUuid,
      },
    });

    const dog = await this.prisma.dog.findUnique({
      where: {
        uuid: createWalkDto.dogUuid,
      },
    });
    const dataDate = createWalkDto?.actionDate
      ? createWalkDto?.actionDate
      : new Date();
    const walk = await this.prisma.walk.create({
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
    return new WalkEntity(walk);
  }

  async findOne(id: number) {
    const walk = await this.prisma.walk.findUnique({
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
    return new WalkEntity(walk);
  }

  async update(id: number, updateWalkDto: UpdateWalkDto) {
    const walk = await this.prisma.walk.update({
      where: { id: id },
      data: {
        date: updateWalkDto.actionDate || undefined,
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
    return new WalkEntity(walk);
  }

  async remove(id: number) {
    return new WalkEntity(
      await this.prisma.cleaning.delete({
        where: {
          id: id,
        },
      }),
    );
  }
}
