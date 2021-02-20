import { Test, TestingModule } from '@nestjs/testing';
import { DocumentsService } from '../services/documents.service';
import { DocumentsController } from './documents.controller';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Document } from '../entities/document.entity';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { SnLoggerService } from '../../logger/sn-logger.service';

describe('DocumentsController', () => {
  let controller: DocumentsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        DocumentsController,
      ],
      providers: [
        DocumentsService,
        {
          provide: getRepositoryToken(Document),
          useFactory: repositoryMockFactory
        },
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        }
      ]
    }).compile();

    controller = module.get<DocumentsController>(DocumentsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
