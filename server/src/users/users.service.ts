import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as argon from 'argon2';
import { UpdatePasswordDto } from './dto/updatePasswordDto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOnePrivate(uuid: string) {
    return await this.prisma.user.findUnique({
      where: { uuid },
      include: {
        gender: {
          select: {
            name: true,
          },
        },
      },
    });
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
      include: {
        gender: {
          select: {
            name: true,
          },
        },
      },
    });
  }

  async updatePassword(uuid: string, updateUserDto: UpdatePasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { uuid: uuid },
    });
    if (!user) throw new UnauthorizedException('Unauthorized');

    const passwordMatches = await argon.verify(
      user.passwdHash,
      updateUserDto.oldPassword,
    );
    if (!passwordMatches) throw new UnauthorizedException('Unauthorized');

    const hash = await argon.hash(updateUserDto.newPassword);

    await this.prisma.user.update({
      where: {
        uuid: uuid,
      },
      data: {
        passwdHash: hash,
      },
    });

    return { status: 'success', message: 'Password changed successfully' };
  }

  async removePrivate(uuid: string) {
    return await this.prisma.user.delete({ where: { uuid } });
  }
}
