import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bull';

import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    BullModule.forRootAsync({
      useFactory: async () => ({
        redis: {
          host: 'localhost',
          port: 6379,
        },
      }),
    }),
    MailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
