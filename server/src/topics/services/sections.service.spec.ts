import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../mocks';
import { Section } from '../entities/section.entity';
import { Topic } from '../entities/topic.entity';
import { SectionsService } from './sections.service';

describe('SectionsService', () => {
  let service: SectionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SectionsService,
        { 
          provide: getRepositoryToken(Topic), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Section), 
          useFactory: repositoryMockFactory
        },
      ],
    }).compile();

    service = module.get<SectionsService>(SectionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
