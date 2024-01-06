import {
  Body,
  Controller,
  Post,
  Get,
  UseGuards,
  Res,
  Param,
  Redirect,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { Signin, Signup } from './dto';
import { GetCurrentUserUuid, Public } from 'src/common/decorators';
import { RtGuard } from 'src/common/guards';
import { ApiTags } from '@nestjs/swagger';
import { Response } from 'express';
import { ResetPasswordEmail } from './dto/resetPasswordEmail.dto';
import { ResetPassword } from './dto/resetPassword.dto';

@Public()
@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signup(@Body() dto: Signup) {
    return this.authService.signup(dto);
  }

  @Post('signin')
  signin(@Body() dto: Signin, @Res({ passthrough: true }) res: Response) {
    return this.authService.signin(dto, res);
  }

  @Get('logout')
  logout(@Res({ passthrough: true }) res: Response) {
    return this.authService.logout(res);
  }

  @UseGuards(RtGuard)
  @Get('refresh')
  refreshToken(
    @GetCurrentUserUuid() userUuid: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    return this.authService.refreshToken(userUuid, res);
  }

  @Redirect('http://192.168.0.66:5173')
  @Get('confirmation/:confirmationToken/:email')
  emailConfirmation(
    @Param('confirmationToken') confirmationToken: string,
    @Param('email') email: string,
  ) {
    return this.authService.emailConfirmation(confirmationToken, email);
  }

  @Post('password-reset')
  passwordResetEmail(@Body() dto: ResetPasswordEmail) {
    return this.authService.passwordResetEmail(dto);
  }

  @Post('password-reset/:confirmationToken/:email')
  passwordReset(
    @Param('confirmationToken') confirmationToken: string,
    @Param('email') email: string,
    @Body() dto: ResetPassword,
  ) {
    this.authService.passwordReset(confirmationToken, email, dto);
  }
}
