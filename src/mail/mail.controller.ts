import { Body, Controller, Post } from '@nestjs/common';

import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
  constructor(private _mailService: MailService) {}

  @Post()
  async sendMail(@Body() body: { email: string }) {
    return this._mailService.sendMail(body.email);
  }
}
