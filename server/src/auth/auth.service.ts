import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Signup, Signin } from './dto';
import * as argon from 'argon2';
import { nanoid } from 'nanoid';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload.type';
import { UserEntity } from 'src/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async signup(dto: Signup) {
    const hash = await argon.hash(dto.password);
    const uuid = nanoid();

    await this.prisma.user.create({
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

    return { status: 'success', message: 'Account created successfully' };
  }

  async signin(
    dto: Signin,
  ): Promise<{ tokens: Tokens; userEntity: UserEntity }> {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        gender: {
          select: {
            name: true,
          },
        },
      },
    });
    if (!user) throw new UnauthorizedException('Unauthorized');

    const passwordMatches = await argon.verify(user.passwdHash, dto.password);
    if (!passwordMatches) throw new UnauthorizedException('Unauthorized');

    const tokens: Tokens = await this.getTokens(user.uuid, user.email);
    await this.updateRtHash(user.uuid, tokens.refreshToken);
    const userEntity = new UserEntity(user);

    return { tokens, userEntity };
  }

  async logout(userUuid: string): Promise<string> {
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
    return 'Logged out successfully';
  }

  async refreshToken(userUuid: string, rt: string): Promise<Tokens> {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });
    if (!user || !user.rtHash) throw new UnauthorizedException('Unauthorized');

    const rtMatches = await argon.verify(user.rtHash, rt);
    if (!rtMatches) throw new UnauthorizedException('Unauthorized');

    const tokens = await this.getTokens(user.uuid, user.email);
    await this.updateRtHash(user.uuid, tokens.refreshToken);

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
      sub: userUuid,
      email: email,
    };

    const [at, rt] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: 60 * 15,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN,
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken: at,
      refreshToken: rt,
    };
  }
}
