import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Request } from 'express';
import { ForbiddenException, Injectable } from '@nestjs/common';

@Injectable()
export class RtStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor() {
    console.log('first');
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        RtStrategy.extractJWTFromCookie,
      ]),
      secretOrKey: process.env.REFRESH_TOKEN,
      passReqToCallback: true,
    });
  }

  validate(req: Request, payload: any) {
    return {
      ...payload,
      refreshToken: req,
    };
  }

  private static extractJWTFromCookie(req: Request): string | null {
    if (req.cookies && req.cookies.jwt) {
      console.log(req.cookies.jwt);
      return req.cookies.jwt;
    }
    return null;
  }
}
