import {
  BadRequestException,
  ConflictException,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';
import { Signup, Signin } from './dto';
import * as argon from 'argon2';
import { nanoid } from 'nanoid';
import { Tokens } from './types';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './types/jwtPayload.type';
import { UserEntity } from 'src/users/dto/user.entity';
import { Response } from 'express';
import { MailingService } from 'src/mailing/mailing.service';
import { ResetPasswordEmail } from './dto/resetPasswordEmail.dto';
import { ResetPassword } from './dto/resetPassword.dto';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    readonly mailingService: MailingService,
  ) {}

  async signup(dto: Signup) {
    // Check if the user already exists
    const duplicate = await this.prisma.user.count({
      where: {
        email: dto.email,
      },
    });

    if (duplicate > 0) throw new ConflictException('Account already exists');

    // Create user
    const hash = await argon.hash(dto.password);
    const uuid = nanoid();

    const user = await this.prisma.user.create({
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

    // Send confirmation email
    let confirmationToken = await argon.hash(uuid);
    confirmationToken = Buffer.from(confirmationToken, 'utf8').toString('hex');
    this.mailingService.sendEmailConfirmation(user, confirmationToken);

    return { status: 'success', message: 'Account created successfully' };
  }

  async signin(dto: Signin, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
      include: {
        gender: true,
      },
    });
    if (!user)
      throw new UnauthorizedException(
        'Sorry, the email or password you entered is incorrect.',
      );

    const passwordMatches = await argon.verify(user.passwdHash, dto.password);
    if (!passwordMatches)
      throw new UnauthorizedException(
        'Sorry, the email or password you entered is incorrect.',
      );

    if (user.isActive === false)
      throw new ForbiddenException(
        'Your account is not verified. Check your email',
      );

    const tokens: Tokens = await this.getTokens(user.uuid, user.email);
    const userEntity = new UserEntity(user);

    res.cookie('jwt', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 100,
    });

    return { accessToken: tokens.accessToken, userEntity };
  }

  async logout(res: Response) {
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    return { status: 'success', message: 'Logout successfully!' };
  }

  async refreshToken(userUuid: string, res: Response) {
    const user = await this.prisma.user.findUnique({
      where: {
        uuid: userUuid,
      },
    });

    if (!user) throw new UnauthorizedException('Unauthorized');

    const tokens = await this.getTokens(user.uuid, user.email);
    res.clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true });
    res.cookie('jwt', tokens.refreshToken, {
      httpOnly: true,
      sameSite: 'none',
      secure: true,
      maxAge: 24 * 60 * 60 * 1000,
    });

    return { accessToken: tokens.accessToken };
  }

  async emailConfirmation(confirmationToken: string, email: string) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new BadRequestException('User not found');

    // Check if given token is valid
    const buffer = Buffer.from(confirmationToken, 'hex');
    const givenTokenHash = buffer.toString('utf8');
    const tokenMatches = await argon.verify(givenTokenHash, user.uuid);
    if (!tokenMatches) throw new BadRequestException('Invalid token');

    // If everyting is fine - update user
    await this.prisma.user.update({
      where: { email: email },
      data: {
        isActive: true,
      },
    });
    console.log('test');
    return { status: 'success', message: 'Account created successfully' };
  }

  async getTokens(userUuid: string, email: string) {
    const jwtPayload: JwtPayload = {
      sub: userUuid,
      email: email,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.ACCESS_TOKEN,
        expiresIn: 60 * 60 * 24,
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: process.env.REFRESH_TOKEN,
        expiresIn: 60 * 2,
      }),
    ]);

    return { accessToken, refreshToken };
  }

  async passwordResetEmail(dto: ResetPasswordEmail) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) throw new BadRequestException('User not found');

    let confirmationToken = await argon.hash(user.uuid);
    confirmationToken = Buffer.from(confirmationToken, 'utf8').toString('hex');
    this.mailingService.sendEmailPasswordReset(user, confirmationToken);
  }

  async passwordReset(
    confirmationToken: string,
    email: string,
    dto: ResetPassword,
  ) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (!user) throw new BadRequestException('User not found');

    // Check if given token is valid
    const buffer = Buffer.from(confirmationToken, 'hex');
    const givenTokenHash = buffer.toString('utf8');
    const tokenMatches = await argon.verify(givenTokenHash, user.uuid);
    if (!tokenMatches) throw new BadRequestException('Invalid token');

    const hash = await argon.hash(dto.newPassword);

    await this.prisma.user.update({
      where: {
        uuid: user.uuid,
      },
      data: {
        passwdHash: hash,
      },
    });

    return { status: 'success', message: 'Password updated successfully!' };
  }
}
