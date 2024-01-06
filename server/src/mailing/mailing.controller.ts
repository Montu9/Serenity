import { Controller, Get } from '@nestjs/common';
import { MailingService } from './mailing.service';
import { Public } from 'src/common/decorators';

@Controller('mailing')
@Public()
export class MailingController {
  constructor(readonly mailingService: MailingService) {}

  // @Get('send-mail')
  // public sendMail() {
  //   console.log('test');
  //   this.mailingService.sendEmailConfirmation();
  // }
}
