import { Test, TestingModule } from '@nestjs/testing';
import { CalendarIntegrationsService } from '../services/calendar-integrations.service';
import { CalendarIntegrationsController } from './calendar-integrations.controller';

import { getRepositoryToken } from '@nestjs/typeorm';
import { CalendarIntegration } from '../entities/calendar-integration.entity';
import { CalendarIntegrationType } from '../entities/calendar-integration-type.entity';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { SnLoggerService } from '../../logger/sn-logger.service';

import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';
dotenv.config();

describe('CalendarIntegrationsController', () => {
  let controller: CalendarIntegrationsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule
      ],
      controllers: [
        CalendarIntegrationsController
      ],
      providers: [
        CalendarIntegrationsService,
        { 
          provide: getRepositoryToken(CalendarIntegration), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(CalendarIntegrationType), 
          useFactory: repositoryMockFactory
        },
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        }
      ]
    }).compile();

    controller = module.get<CalendarIntegrationsController>(CalendarIntegrationsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
