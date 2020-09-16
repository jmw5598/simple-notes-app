import { Test, TestingModule } from '@nestjs/testing';
import { SnLoggerService } from './sn-logger.service';

describe('InvLoggerService', () => {
  let service: SnLoggerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SnLoggerService],
    }).compile();

    service = module.get<SnLoggerService>(SnLoggerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
