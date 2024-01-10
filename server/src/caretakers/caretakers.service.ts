import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { CaretakerEntity } from './dto/caretaker.entity';
import { CreateCaretakerByEmailDto } from './dto/create-caretaker.dto';
import { UpdateCaretakerDto } from './dto/update-caretaker.dto';

@Injectable()
export class CaretakersService {
  constructor(private prisma: PrismaService) {}

  async create(
    createCaretakerDto: CreateCaretakerByEmailDto,
    shelterUuid: string,
  ) {
    const email = createCaretakerDto.email;
    await this.prisma.$transaction(async (prisma) => {
      const role = await this.prisma.role.findUnique({
        where: { name: createCaretakerDto.role },
      });

      if (!role) throw new NotFoundException('Role not found');
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
              name: createCaretakerDto.role,
            },
          },
        },
      });
    });
    return { status: 'success', message: 'Caretaker created successfully!' };
  }

  async findOneByUuid(caretakerUuid: string, shelterUuid: string) {
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

    const caretaker = await this.prisma.usersShelters.findFirst({
      where: {
        shelterId: shelter.id,
        userId: user.id,
      },
      include: {
        User: true,
        role: true,
      },
    });

    return new CaretakerEntity({ ...caretaker.User, role: caretaker.role });
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

    const role = updateCaretakerDto.role
      ? await this.prisma.role.findUnique({
          where: {
            name: updateCaretakerDto.role,
          },
        })
      : undefined;

    await this.prisma.usersShelters.update({
      where: {
        userId_shelterId: {
          userId: user?.id || undefined,
          shelterId: shelter?.id || undefined,
        },
      },
      data: {
        roleId: role?.id || undefined,
      },
    });
    return { status: 'success', message: 'Caretaker updated successfully!' };
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

    return { status: 'success', message: 'Caretaker removed successfully!' };
  }
}
