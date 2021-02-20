import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { Section } from '../entities/section.entity';
import { Topic } from '../entities/topic.entity';
import { SectionsService } from '../services/sections.service';
import { SectionsController } from './sections.controller';

describe('SectionsController', () => {
  let controller: SectionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        SectionsController
      ],
      providers: [
        SectionsService,
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        },
        { 
          provide: getRepositoryToken(Topic), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Section), 
          useFactory: repositoryMockFactory
        }
      ]
    }).compile();

    controller = module.get<SectionsController>(SectionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
