import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { Theme } from '../entities/theme.entity';
import { ThemesService } from '../services/themes.service';
import { ThemesController } from './themes.controller';
import { SnLoggerService } from '../../logger/sn-logger.service';

describe('ThemesController', () => {
  let controller: ThemesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        ThemesController
      ],
      providers: [
        ThemesService,
        { 
          provide: getRepositoryToken(Theme), 
          useFactory: repositoryMockFactory
        },
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        }
      ]
    }).compile();

    controller = module.get<ThemesController>(ThemesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
