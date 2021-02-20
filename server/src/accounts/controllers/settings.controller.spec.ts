import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { repositoryMockFactory, snLoggerServiceMock } from '../../mocks';
import { Theme } from '../../themes/entities/theme.entity';
import { ThemesService } from '../../themes/services/themes.service';
import { Account } from '../entities/account.entity';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { SettingsService } from '../services/settings.service';
import { SettingsController } from './settings.controller';

describe('SettingsController', () => {
  let controller: SettingsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [
        SettingsController
      ],
      providers: [
        SettingsService,
        ThemesService,
        { 
          provide: getRepositoryToken(Theme), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(Account), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(KeyboardShortcut), 
          useFactory: repositoryMockFactory
        },
        { 
          provide: getRepositoryToken(KeyboardShortcutAction), 
          useFactory: repositoryMockFactory
        },
        {
          provide: SnLoggerService,
          useValue: snLoggerServiceMock
        }
      ]
    }).compile();

    controller = module.get<SettingsController>(SettingsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
