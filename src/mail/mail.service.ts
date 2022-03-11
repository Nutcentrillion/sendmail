import { Injectable, Logger } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class MailService {
  private readonly _logger = new Logger(MailService.name);

  constructor(@InjectQueue('MAIL_QUEUE') private readonly _mailQueue: Queue) {}

  async sendMail(email: string): Promise<void> {
    try {
      await this._mailQueue.add('SEND_MAIL', {
        email,
      });
    } catch (error) {
      this._logger.error(`Error queueing registration email to user ${email}`);

      throw error;
    }
  }
}
