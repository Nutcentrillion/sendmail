import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { join } from 'path';

import { MailController } from './mail.controller';
import { MailService } from './mail.service';

@Module({
  imports: [
    MailerModule.forRootAsync({
      useFactory: async () => ({
        transport: 'smtps://test@gmail.com:password@smtp.gmail.com',
        // transport: {
        //   host: 'smtp.gmail.com',
        //   port: 587,
        //   secure: false,
        //   auth: {
        //     user: 'test@gmail.com',
        //     pass: 'password',
        //   },
        // },
        defaults: {
          from: `"No Reply" <noreply@gmail.com>`,
        },
        template: {
          dir: join(__dirname, 'templates'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: true,
          },
        },
      }),
    }),
  ],
  controllers: [MailController],
  providers: [MailService],
})
export class MailModule {}