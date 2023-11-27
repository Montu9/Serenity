import { Injectable } from '@nestjs/common';
import { CreateMedicateDto } from './dto/create-medicate.dto';
import { UpdateMedicateDto } from './dto/update-medicate.dto';
import { PrismaService } from 'nestjs-prisma';
import { MedicateEntity } from './dto/medicate.entity';

@Injectable()
export class MedicateService {
  constructor(private prisma: PrismaService) {}

  async create(createMedicateDto: CreateMedicateDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: createMedicateDto.caretakerUuid,
      },
    });

    const dog = await this.prisma.dog.findUnique({
      where: {
        uuid: createMedicateDto.dogUuid,
      },
    });

    const dataDate = createMedicateDto?.actionDate
      ? createMedicateDto?.actionDate
      : new Date();

    const medicate = await this.prisma.medicate.create({
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
    return new MedicateEntity(medicate);
  }

  async findOne(id: number) {
    const medicate = await this.prisma.cleaning.findUnique({
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
    return new MedicateEntity(medicate);
  }

  async update(id: number, updateMedicateDto: UpdateMedicateDto) {
    const medicate = await this.prisma.cleaning.update({
      where: { id: id },
      data: {
        date: updateMedicateDto.actionDate || undefined,
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
    return new MedicateEntity(medicate);
  }

  async remove(id: number) {
    return new MedicateEntity(
      await this.prisma.cleaning.delete({
        where: {
          id: id,
        },
      }),
    );
  }
}
