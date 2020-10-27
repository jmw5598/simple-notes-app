import { Test, TestingModule } from '@nestjs/testing';
import { CalendarIntegrationsController } from './calendar-integrations.controller';

describe('CalendarIntegrationsController', () => {
  let controller: CalendarIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CalendarIntegrationsController],
    }).compile();

    controller = module.get<CalendarIntegrationsController>(CalendarIntegrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
