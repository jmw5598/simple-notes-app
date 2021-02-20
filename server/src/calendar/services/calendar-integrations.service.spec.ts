import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../mocks';
import { CalendarIntegrationType } from '../entities/calendar-integration-type.entity';
import { CalendarIntegration } from '../entities/calendar-integration.entity';
import { CalendarIntegrationsService } from './calendar-integrations.service';

describe('CalendarIntegrationsService', () => {
  let service: CalendarIntegrationsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CalendarIntegrationsService,
        { 
          provide: getRepositoryToken(CalendarIntegration), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(CalendarIntegrationType), 
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    service = module.get<CalendarIntegrationsService>(CalendarIntegrationsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
