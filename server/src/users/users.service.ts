import { Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as argon from 'argon2';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  findOnePrivate(uuid: string) {
    return this.prisma.user.findUnique({ where: { uuid } });
  }

  async updatePrivate(uuid: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }

    return await this.prisma.user.update({
      where: { uuid },
      data: {
        email: updateUserDto.email,
        passwdHash: updateUserDto.password,
        firstName: updateUserDto.firstName,
        lastName: updateUserDto.lastName,
        gender: {
          connect: {
            name: updateUserDto.gender,
          },
        },
      },
    });
  }

  async removePrivate(uuid: string) {
    return await this.prisma.user.delete({ where: { uuid } });
  }
}
