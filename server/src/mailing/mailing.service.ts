import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Options } from 'nodemailer/lib/smtp-transport';
import { google } from 'googleapis';
import { User } from '@prisma/client';

@Injectable()
export class MailingService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
  ) {}

  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.configService.get('CLIENT_ID'),
      this.configService.get('CLIENT_SECRET'),
      'https://developers.google.com/oauthplayground',
    );

    oauth2Client.setCredentials({
      refresh_token: process.env.REFRESH_TOKEN,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          console.log(err);
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.configService.get('EMAIL'),
        clientId: this.configService.get('CLIENT_ID'),
        clientSecret: this.configService.get('CLIENT_SECRET'),
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  public async sendEmailConfirmation(user: User, confirmationToken: string) {
    const confirmationUrl =
      'https://serenityms.pl:3001/api/auth/confirmation/' +
      confirmationToken +
      '/' +
      user.email;

    await this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'noreply.serenityms@gmail.com', // sender address
      subject: 'Serenity - verficiaction link', // Subject line
      template: './confirmation',
      context: {
        confirmationUrl: confirmationUrl,
        firstName: user.firstName,
      },
    });
  }

  public async sendEmailPasswordReset(user: User, confirmationToken: string) {
    const confirmationUrl =
      'https://serenityms.pl:5173/forgot-password/' +
      confirmationToken +
      '/' +
      user.email;

    await this.mailerService.sendMail({
      to: user.email, // list of receivers
      from: 'noreply.serenityms@gmail.com', // sender address
      subject: 'Serenity - reset password', // Subject line
      template: './resetPassword',
      context: {
        confirmationUrl: confirmationUrl,
        firstName: user.firstName,
      },
    });
  }
}
