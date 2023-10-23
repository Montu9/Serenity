import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Signup, Signin } from './dto';
import * as argon from 'argon2';
import { nanoid } from 'nanoid';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload.type';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: Signup): Promise<Tokens> {
    console.log(dto.email);
    const hash = await argon.hash(dto.password);
    const uuid = nanoid();
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        passwdHash: hash,
        firstName: dto.firstName,
        lastName: dto.lastName,
        gender: {
          connect: {
            name: dto.gender,
          },
        },
        uuid: uuid,
      },
    });

    const tokens = await this.getTokens(newUser.uuid, newUser.email);
    await this.updateRtHash(newUser.uuid, newUser.email);
    return tokens;
  }

  async signin(dto: Signin): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (!user) throw new ForbiddenException('Access Denied');

    const passwordMatches = await argon.verify(user.passwdHash, dto.password);
    if (!passwordMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.uuid, user.email);
    await this.updateRtHash(user.uuid, tokens.refresh_token);
    return tokens;
  }

  async logout(userUuid: string): Promise<boolean> {
    await this.prisma.user.updateMany({
      where: {
        uuid: userUuid,
        rtHash: {
          not: null,
        },
      },
      data: {
        rtHash: null,
      },
    });
    return true;
  }

  async refreshToken(userUuid: string, rt: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });
    if (!user || !user.rtHash) throw new ForbiddenException('Access Denied');

    const rtMatches = await argon.verify(user.rtHash, rt);
    if (!rtMatches) throw new ForbiddenException('Access Denied');

    const tokens = await this.getTokens(user.uuid, user.email);
    await this.updateRtHash(user.uuid, tokens.refresh_token);

    return tokens;
  }

  async updateRtHash(userUuid: string, rt: string): Promise<void> {
    const hash = await argon.hash(rt);
    await this.prisma.user.update({
      where: {
        uuid: userUuid,
      },
      data: {
        rtHash: hash,
      },
    });
  }

  async getTokens(userUuid: string, email: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = {
      userUuid: userUuid,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: 'at-secret',
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: 'rt-secret',
        expiresIn: '7d',
      }),
    ]);

    return {
      access_token: at,
      refresh_token: rt,
    };
  }
}
