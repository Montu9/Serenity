import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Get,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signin, Signup } from './dto';
import {
  GetCurrentUser,
  GetCurrentUserUuid,
  Public,
} from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { Tokens } from './types';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() dto: Signup): Promise<boolean> {
    return this.authService.signup(dto);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: Signin): Promise<Tokens> {
    return this.authService.signin(dto);
  }

  @Get('logout')
  @HttpCode(HttpStatus.OK)
  @ApiBearerAuth()
  logout(@GetCurrentUserUuid() userUuid: string): Promise<boolean> {
    return this.authService.logout(userUuid);
  }

  @Public()
  @ApiBearerAuth()
  @UseGuards(RtGuard)
  @Get('refresh')
  @HttpCode(HttpStatus.OK)
  refreshToken(
    @GetCurrentUserUuid() userUuid: string,
    @GetCurrentUser('refreshToken') refreshToken: string,
  ): Promise<Tokens> {
    return this.authService.refreshToken(userUuid, refreshToken);
  }
}
