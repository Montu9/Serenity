import { Injectable } from '@nestjs/common';
import { CreateShelterDto } from './dto/create-shelter.dto';
import { UpdateShelterDto } from './dto/update-shelter.dto';
import { PrismaService } from 'nestjs-prisma';
import { nanoid } from 'nanoid';

@Injectable()
export class SheltersService {
  constructor(private prisma: PrismaService) {}

  async create(createShelterDto: CreateShelterDto, userUuid: string) {
    const uuid = nanoid();

    await this.prisma.shelter.create({
      data: {
        name: createShelterDto.name,
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
                  name: 'ADMIN', // Replace with the role name "admin"
                },
              },
            },
          ],
        },
      },
    });
    return 'This action adds a new shelter';
  }

  findAll() {
    return `This action returns all shelters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} shelter`;
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

  update(id: number, updateShelterDto: UpdateShelterDto) {
    return `This action updates a #${id} shelter`;
  }

  remove(id: number) {
    return `This action removes a #${id} shelter`;
  }
}
