import { UnprocessableEntityException } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { async } from 'rxjs';
import { ThemeDto } from 'src/themes/dtos/theme.dto';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { repositoryMockFactory, requestMock, snLoggerServiceMock } from '../../mocks';
import { Theme } from '../../themes/entities/theme.entity';
import { ThemesService } from '../../themes/services/themes.service';
import { CreateKeyboardShortcutDto } from '../dtos/create-keyboard-shortcut.dto';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { UpdateKeyboardShortcutDto } from '../dtos/update-keyboard-shortcut.dto';
import { Account } from '../entities/account.entity';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';
import { SettingsService } from '../services/settings.service';
import { SettingsController } from './settings.controller';

describe('SettingsController', () => {
  let controller: SettingsController;
  let settingsService: SettingsService;
  let logger: SnLoggerService;

  const keyboardShortcutActionDtosMock: KeyboardShortcutActionDto[] = [
    { 
      id: 1,
      action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
      shortcut: 'alt + p'
    } as KeyboardShortcutActionDto,
    { 
      id: 2,
      action: KeyboardShortcutActionType.CREATE_DOCUMENT,
      shortcut: 'alt + c'
    } as KeyboardShortcutActionDto
  ];

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
    settingsService = module.get<SettingsService>(SettingsService);
    logger = module.get<SnLoggerService>(SnLoggerService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should call SettingsService.getKeyboardShortcuts with accountId when getKeyboardShortcuts is called', async () => {
    spyOn(settingsService, 'getKeyboardShortcuts').and.returnValue(keyboardShortcutActionDtosMock);
    const result: KeyboardShortcutActionDto[] = await controller.getKeyboardShortcuts(requestMock);
    expect(settingsService.getKeyboardShortcuts).toHaveBeenCalledWith(+requestMock.user.accountId);
    expect(result).toEqual(keyboardShortcutActionDtosMock);
  });

  it('should catch and log error when getKeyboardShortcuts throws an error', async () => {
    spyOn(settingsService, 'getKeyboardShortcuts').and.callFake(() => { throw new UnprocessableEntityException(); })
    spyOn(logger, 'error');
    try {
      await controller.getKeyboardShortcuts(requestMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(UnprocessableEntityException);
    }
  });

  it('should call SettingsService.createKeyboardShortcut when createKeyboardShortcut is called', async () => {
    const createKeyboardShortcutMock: CreateKeyboardShortcutDto = { actionId: 1, shortcut: 'alt + s' };
    const createKeyboardShortcutResultMock: KeyboardShortcutActionDto = {
      action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
      id: 1,
      shortcut: createKeyboardShortcutMock.shortcut
    } as KeyboardShortcutActionDto;
    spyOn(settingsService, 'createKeyboardShortcut').and.returnValue(createKeyboardShortcutResultMock);
    const result: KeyboardShortcutActionDto = await controller.createKeyboardShortcut(requestMock, createKeyboardShortcutMock);
    expect(settingsService.createKeyboardShortcut).toHaveBeenCalledWith(+requestMock.user.accountId, createKeyboardShortcutMock);
    expect(result).toEqual(createKeyboardShortcutResultMock);
  });

  it('should catch and log error when createKayboardShortcut throws an exception', async () => {
    const createKeyboardShortcutMock: CreateKeyboardShortcutDto = { actionId: 1, shortcut: 'alt + s' };
    spyOn(settingsService, 'createKeyboardShortcut').and.callFake(() => { throw new AccountNotFoundException(); });
    spyOn(logger, 'error');
    try {
      await controller.createKeyboardShortcut(requestMock, createKeyboardShortcutMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should call SettingsService.updateKeyboardShortcut when updateKeyboardShortcut is called', async () => {
    const shortcutIdMock: number = 1;
    const updateKeyboardShortcutActionDtoMock: UpdateKeyboardShortcutDto = {
      actionId: 1,
      shortcut: 'alt + c'
    } as UpdateKeyboardShortcutDto;
    const keyboardShortcutActionDtoMock: KeyboardShortcutActionDto = { 
      id: shortcutIdMock, 
    } as KeyboardShortcutActionDto
    spyOn(settingsService, 'updateKeyboardShortcut').and.returnValue(keyboardShortcutActionDtoMock);
    const result: KeyboardShortcutActionDto = await controller.updateKeyboardShortcut(requestMock, shortcutIdMock, updateKeyboardShortcutActionDtoMock);
    expect(settingsService.updateKeyboardShortcut).toHaveBeenCalledWith(+requestMock.user.accountId, shortcutIdMock, updateKeyboardShortcutActionDtoMock);
    expect(result).toEqual(keyboardShortcutActionDtoMock);
  });

  it('should catch and log error when an exception is thrown in updateKeyboardShortcut', async () => {
    const shortcutIdMock: number = 1;
    const updateKeyboardShortcutDtoMock: UpdateKeyboardShortcutDto = { actionId: 1, shortcut: 'alt + p' } as UpdateKeyboardShortcutDto;
    spyOn(settingsService, 'updateKeyboardShortcut').and.callFake(() => { throw new AccountNotFoundException(); });
    spyOn(logger, 'error');
    try {
      await controller.updateKeyboardShortcut(
        requestMock, 
        shortcutIdMock,
        updateKeyboardShortcutDtoMock
      );
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should call SettingsService.deleteKeyboardShortcut when deleteKeyboardShortcut is called', async () => {
    const shortcutIdMock: number = 1;
    const keyboardShortcutActionDtoMock: KeyboardShortcutActionDto = { 
      id: shortcutIdMock, 
    } as KeyboardShortcutActionDto
    spyOn(settingsService, 'deleteKeyboardShortcut').and.returnValue(keyboardShortcutActionDtoMock);
    const result: KeyboardShortcutActionDto = await controller.deleteKeyboardShortcut(requestMock, shortcutIdMock);
    expect(settingsService.deleteKeyboardShortcut).toHaveBeenCalledWith(+requestMock.user.accountId, shortcutIdMock);
    expect(result).toEqual(keyboardShortcutActionDtoMock);
  });

  it('should catch and log errow hen an exception is thrown in deleteKeybaordShortcut', async () => {
    const shortcutIdMock: number = 1;
    spyOn(settingsService, 'deleteKeyboardShortcut').and.callFake(() => { throw new AccountNotFoundException(); });
    spyOn(logger, 'error');
    try {
      await controller.deleteKeyboardShortcut(requestMock, shortcutIdMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });

  it('should update accounts default theme when changeAccountTheme is called', async () => {
    const themeIdMock: number = 1;
    const themeDtoMock: ThemeDto = { id: themeIdMock, name: 'Default', filename: 'theme-1.css' } as ThemeDto
    spyOn(settingsService, 'changeAccountTheme').and.returnValue(themeDtoMock);
    const result: ThemeDto = await controller.changeAccountTheme(requestMock, themeIdMock);
    expect(settingsService.changeAccountTheme).toHaveBeenCalledWith(+requestMock.user.accountId, themeIdMock);
    expect(result).toEqual(themeDtoMock);
  });

  it('should catch and log error when an execption is thrown in changeAccountTheme', async () => {
    const themeIdMock: number = 1;
    spyOn(settingsService, 'changeAccountTheme').and.callFake(() => { throw new AccountNotFoundException(); });
    spyOn(logger, 'error');
    try {
      await controller.changeAccountTheme(requestMock, themeIdMock);
    } catch (error) {
      expect(logger.error).toHaveBeenCalledTimes(1);
      expect(error).toBeInstanceOf(AccountNotFoundException);
    }
  });
});
