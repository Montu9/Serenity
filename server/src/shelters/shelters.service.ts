import { Injectable } from '@nestjs/common';
import { nanoid } from 'nanoid';
import { PrismaService } from 'nestjs-prisma';
import { CaretakerEntity } from 'src/caretakers/dto/caretaker.entity';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { ShelterEntity } from './dto/shelter.entity';
import { UpdateShelterDto } from './dto/update-shelter.dto';

@Injectable()
export class SheltersService {
  constructor(private prisma: PrismaService) {}

  async create(createShelterDto: CreateShelterDto, userUuid: string) {
    const uuid = nanoid();

    const shelter = await this.prisma.shelter.create({
      data: {
        name: createShelterDto.name,
        description: createShelterDto.description,
        uuid: uuid,
        users: {
          create: [
            {
              User: {
                connect: {
                  uuid: userUuid,
                },
              },
              role: {
                connect: {
                  name: 'ADMIN',
                },
              },
            },
          ],
        },
      },
    });

    return new ShelterEntity(shelter);
  }

  async findOne(shelterUuid: string) {
    const shelter = await this.prisma.shelter.findUnique({
      where: { uuid: shelterUuid },
    });

    return new ShelterEntity(shelter);
  }

  async getAllCaretakers(id: string): Promise<CaretakerEntity[]> {
    const caretakers = await this.prisma.usersShelters.findMany({
      where: {
        Shelter: {
          uuid: id,
        },
      },
      select: {
        role: true,
        User: true,
      },
    });

    return caretakers.map(
      (caretaker) =>
        new CaretakerEntity({
          ...caretaker.User,
          role: caretaker.role,
        }),
    );
  }

  getUserShelters(userUuid: string) {
    const shelters = this.prisma.usersShelters.findMany({
      where: {
        User: {
          uuid: userUuid,
        },
      },
      select: {
        role: {
          select: {
            name: true,
          },
        },
        Shelter: {
          select: {
            name: true,
            uuid: true,
            updatedAt: true,
            createdAt: true,
            description: true,
            id: false,
          },
        },
      },
    });
    return shelters;
  }

  // async addCaretakerByEmail(id: string, addByEmail: { email: string }) {
  //   const email = addByEmail.email;
  //   await this.prisma.$transaction(async (prisma) => {
  //     const user = await prisma.user.findUnique({
  //       where: {
  //         email: email,
  //       },
  //     });

  //     if (!user) {
  //       throw new NotFoundException('Email is not associated with any account');
  //     }

  //     await prisma.usersShelters.create({
  //       data: {
  //         User: {
  //           connect: {
  //             email: email,
  //           },
  //         },
  //         Shelter: {
  //           connect: {
  //             uuid: id,
  //           },
  //         },
  //         role: {
  //           connect: {
  //             name: 'CARETAKER',
  //           },
  //         },
  //       },
  //     });
  //   });
  //   return { status: 'success', message: 'Caretaker added successfully' };
  // }

  // async updateCaretakerRole(id: string, caretaker: UpdateCaretakerRole) {
  //   const userId = await this.prisma.user.findUnique({
  //     where: {
  //       uuid: caretaker.userUuid,
  //     },
  //   });
  //   const shelterId = await this.prisma.shelter.findUnique({
  //     where: {
  //       uuid: id,
  //     },
  //   });

  //   await this.prisma.usersShelters.update({
  //     where: {
  //       userId_shelterId: {
  //         userId: userId.id,
  //         shelterId: shelterId.id,
  //       },
  //     },
  //     data: {
  //       role: {
  //         connect: {
  //           name: caretaker.role, // Replace with the role name "admin"
  //         },
  //       },
  //     },
  //   });

  //   return { status: 'success', message: 'Role changed successfully' };
  // }

  // async removeCaretakerByEmail(id: string, userUuid: string) {
  //   const userId = await this.prisma.user.findUnique({
  //     where: {
  //       uuid: userUuid,
  //     },
  //   });
  //   const shelterId = await this.prisma.shelter.findUnique({
  //     where: {
  //       uuid: id,
  //     },
  //   });

  //   await this.prisma.usersShelters.delete({
  //     where: {
  //       userId_shelterId: {
  //         userId: userId.id,
  //         shelterId: shelterId.id,
  //       },
  //     },
  //   });
  // }

  async update(shelteUuid: string, updateShelterDto: UpdateShelterDto) {
    const shelter = await this.prisma.shelter.update({
      where: {
        uuid: shelteUuid,
      },
      data: {
        description: updateShelterDto.description || undefined,
        name: updateShelterDto.name || undefined,
      },
    });
    return new ShelterEntity(shelter);
  }

  async remove(shelterUuid: string) {
    return new ShelterEntity(
      await this.prisma.shelter.delete({ where: { uuid: shelterUuid } }),
    );
  }
}
