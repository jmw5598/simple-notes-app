import { Test, TestingModule } from '@nestjs/testing';
import { CalendarIntegrationsService } from './calendar-integrations.service';

describe('CalendarIntegrationsService', () => {
  let service: CalendarIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CalendarIntegrationsService],
    }).compile();

    service = module.get<CalendarIntegrationsService>(CalendarIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
