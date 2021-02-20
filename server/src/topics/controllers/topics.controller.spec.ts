import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { Section } from '../entities/section.entity';
import { Topic } from '../entities/topic.entity';
import { DocumentsService } from '../services/documents.service';
import { SectionsService } from '../services/sections.service';
import { TopicsService } from '../services/topics.service';
import { TopicsController } from './topics.controller';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';

describe('TopicsController', () => {
  let controller: TopicsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        TopicsController
      ],
      providers: [
        TopicsService,
        SectionsService,
        DocumentsService,
        { 
          provide: getRepositoryToken(Topic), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Section), 
          useFactory: repositoryMockFactory
        },
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        }
      ]
    }).compile();

    controller = module.get<TopicsController>(TopicsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
