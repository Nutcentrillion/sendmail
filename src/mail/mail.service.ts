import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MailService {
  constructor(private mailerService: MailerService) {}

  async sendMail(email: string) {
    const name = 'JoJo';

    await this.mailerService
      .sendMail({
        to: email,
        subject: 'Testing Nest MailerModule ✔',
        template: 'test',
        context: {
          name: name,
        },
      })
      .then(() => {})
      .catch(() => {});
  }
}
