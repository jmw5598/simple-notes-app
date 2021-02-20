import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { Test, TestingModule } from '@nestjs/testing';
import { EmailerService } from './emailer.service';

import * as dotenv from 'dotenv';
dotenv.config();

describe('EmailerService', () => {
  let service: EmailerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        MailerModule.forRoot({
          transport: {
            host: `${process.env.MAIL_URL}`,
            port: `${process.env.MAIL_PORT}`,
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
      providers: [
        EmailerService,
        ConfigService
      ],
    }).compile();

    service = module.get<EmailerService>(EmailerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
