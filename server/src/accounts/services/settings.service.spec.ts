import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { repositoryMockFactory } from '../../mocks';
import { Theme } from '../../themes/entities/theme.entity';
import { Account } from '../entities/account.entity';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { SettingsService } from './settings.service';

describe('SettingsService', () => {
  let service: SettingsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SettingsService,
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
          provide: getRepositoryToken(Theme), 
          useFactory: repositoryMockFactory
        }
      ],
    }).compile();

    service = module.get<SettingsService>(SettingsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
