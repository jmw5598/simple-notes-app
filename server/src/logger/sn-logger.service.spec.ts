import { Test, TestingModule } from '@nestjs/testing';
import { SnLoggerService } from './sn-logger.service';
import{ ConfigService } from '@nestjs/config';

import * as dotenv from 'dotenv';
dotenv.config();

describe('SnLoggerService', () => {
  let service: SnLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SnLoggerService,
        ConfigService
      ],
    }).compile();

    service = await module.resolve<SnLoggerService>(SnLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
