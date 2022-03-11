import { Injectable, Logger } from '@nestjs/common';
import {
  OnQueueActive,
  OnQueueCompleted,
  OnQueueFailed,
  Process,
  Processor,
} from '@nestjs/bull';
import { Job } from 'bull';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
@Processor('MAIL_QUEUE')
export class MailProcessor {
  private readonly _logger = new Logger(MailProcessor.name);

  constructor(private _mailerService: MailerService) {}

  @Process('SEND_MAIL') // here is the name of the executed process
  async sendMail(job: Job<{ email: string }>) {
    this._logger.log(
      `Sending confirm registration email to '${job.data.email}'`,
    );

    try {
      return this._mailerService.sendMail({
        to: job.data.email,
        subject: 'Testing Nest MailerModule ✔',
        template: 'test',
        context: {
          name: MailProcessor.name,
        },
      });
    } catch {
      this._logger.error(
        `Failed to send confirmation email to '${job.data.email}'`,
      );
    }
  }

  @OnQueueActive()
  onActive(job: Job) {
    this._logger.debug(`Processing job ${job.id} of type ${job.name}`);
  }

  @OnQueueCompleted()
  onComplete(job: Job) {
    this._logger.debug(`Completed job ${job.id} of type ${job.name}`);
  }

  @OnQueueFailed()
  onError(job: Job<any>, error: any) {
    this._logger.error(
      `Failed job ${job.id} of type ${job.name}: ${error.message}`,
      error.stack,
    );
  }
}
