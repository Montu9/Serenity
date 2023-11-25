import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'nestjs-prisma';
import * as argon from 'argon2';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UserEntity } from './dto/user.entity';
import { GetUserShelters } from './dto/get-user-shelters.dto';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOnePrivate(uuid: string) {
    const user = await this.prisma.user.findUnique({
      where: { uuid },
      include: {
        gender: true,
      },
    });
    return new UserEntity(user);
  }

  async updateOnePrivate(uuid: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await argon.hash(updateUserDto.password);
    }
    const gender = updateUserDto.gender
      ? await this.prisma.gender.findFirst({
          where: { name: updateUserDto.gender },
        })
      : undefined;

    const user = await this.prisma.user.update({
      where: { uuid },
      data: {
        email: updateUserDto.email || undefined,
        passwdHash: updateUserDto.password || undefined,
        firstName: updateUserDto.firstName || undefined,
        lastName: updateUserDto.lastName || undefined,
        genderId: gender?.id || undefined,
      },
      include: {
        gender: true,
      },
    });

    return new UserEntity(user);
  }

  async getUserShelters(userUuid: string) {
    const shelters = await this.prisma.usersShelters.findMany({
      where: {
        User: {
          uuid: userUuid,
        },
      },
      select: {
        role: true,
        Shelter: true,
      },
    });

    return shelters.map(
      (shelter) => new GetUserShelters(shelter.Shelter, shelter.role),
    );
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

    return 'Password changed successfully';
  }

  async removePrivate(uuid: string) {
    return new UserEntity(await this.prisma.user.delete({ where: { uuid } }));
  }
}
