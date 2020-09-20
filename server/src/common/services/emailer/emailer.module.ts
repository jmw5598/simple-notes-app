import { Module } from '@nestjs/common';
import { MailerModule } from '@nestjs-modules/mailer';
import { EmailerService } from './emailer.service';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  providers: [
    EmailerService
  ],
  imports: [
    MailerModule.forRoot({
      transport: {
        host: `${process.env.MAIL_URL}`,
        port: `${process.env.PORT}`,
        ignoreTLS: true,
        secure: true,
        auth: {
          user: `${process.env.MAIL_USERNAME}`,
          pass: `${process.env.MAIL_PASSWORD}`,
        },
      },
      defaults: {
        from:'"no-reply" <noreply.invmnt@gmail.com>',
      },
    })    
  ],
  exports: [
    EmailerService
  ]
})
export class EmailerModule {}
