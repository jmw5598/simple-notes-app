import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { CalendarEventsService } from '../services/calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';

import { SnLoggerService } from '../../logger/sn-logger.service';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { CalendarEvent } from '../entities/calendar-event.entity';

import * as dotenv from 'dotenv';
dotenv.config();

describe('CalendarEventsController', () => {
  let controller: CalendarEventsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        CalendarEventsController
      ],
      providers: [
        CalendarEventsService,
        { 
          provide: getRepositoryToken(CalendarEvent), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: SnLoggerService,
          useValue: snLoggerServiceMock 
        },
      ]
    }).compile();

    controller = module.get<CalendarEventsController>(CalendarEventsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
