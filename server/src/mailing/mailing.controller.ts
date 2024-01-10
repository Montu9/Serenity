import { Controller } from '@nestjs/common';
import { Public } from 'src/common/decorators';
import { MailingService } from './mailing.service';

@Controller('mailing')
@Public()
export class MailingController {
  constructor(readonly mailingService: MailingService) {}
}
