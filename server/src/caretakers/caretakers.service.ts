import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCaretakerByEmailDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class CaretakersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCaretakerDto: CreateCaretakerByEmailDto,
    shelterUuid: string,
  ) {
    const email = createCaretakerDto.email;
    await this.prisma.$transaction(async (prisma) => {
      const user = await prisma.user.findUnique({
        where: {
          email: email,
        },
      });

      if (!user) {
        throw new NotFoundException('Email is not associated with any account');
      }

      await prisma.usersShelters.create({
        data: {
          User: {
            connect: {
              email: email,
            },
          },
          Shelter: {
            connect: {
              uuid: shelterUuid,
            },
          },
          role: {
            connect: {
              name: 'CARETAKER',
            },
          },
        },
      });
    });
    return 'Caretaker added successfully';
  }

  async update(
    caretakerUuid: string,
    shelterUuid: string,
    updateCaretakerDto: UpdateCaretakerDto,
  ) {
    const user = caretakerUuid
      ? await this.prisma.user.findUnique({
          where: {
            uuid: caretakerUuid,
          },
        })
      : undefined;

    const shelter = shelterUuid
      ? await this.prisma.shelter.findUnique({
          where: {
            uuid: shelterUuid,
          },
        })
      : undefined;

    await this.prisma.usersShelters.update({
      where: {
        userId_shelterId: {
          userId: user.id,
          shelterId: shelter.id,
        },
      },
      data: {
        role: {
          connect: {
            name: updateCaretakerDto.role, // Replace with the role name "admin"
          },
        },
      },
    });
    return 'Caretaker updated successfully!';
  }

  async remove(caretakerUuid: string, shelterUuid: string) {
    const user = caretakerUuid
      ? await this.prisma.user.findUnique({
          where: {
            uuid: caretakerUuid,
          },
        })
      : undefined;

    const shelter = shelterUuid
      ? await this.prisma.shelter.findUnique({
          where: {
            uuid: shelterUuid,
          },
        })
      : undefined;

    await this.prisma.usersShelters.delete({
      where: {
        userId_shelterId: {
          userId: user.id,
          shelterId: shelter.id,
        },
      },
    });

    return 'Caretaker removed successfully!';
  }
}
