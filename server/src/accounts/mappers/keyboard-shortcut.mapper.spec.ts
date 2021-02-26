import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutDto } from '../dtos/keyboard-shortcut.dto';
import { Account } from '../entities/account.entity';
import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutMapper } from './keyboard-shortcut.mapper';

describe('KeyboardShortcutActionMapper', () => {
  const keyboardShortcutMock: KeyboardShortcut = {
    id: 1,
    shortcut: 'alt + d',
    createdAt: new Date(),
    account: new Account(),
    keyboardShortcutAction: {
      id: 1,
      action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
      description: 'Create calendar event',
      defaultShortcut: 'alt + c'
    } as KeyboardShortcutAction
  } as KeyboardShortcut;

  const keyboardShortcutDtoMock: KeyboardShortcutDto = {
    id: keyboardShortcutMock.id,
    action: keyboardShortcutMock.keyboardShortcutAction.action,
    description: keyboardShortcutMock.keyboardShortcutAction.description,
    shortcut: keyboardShortcutMock.shortcut
  } as KeyboardShortcutDto;

  it('should map single KeyboardShortcutAction to a KeyboardShortcutActionDto', () => {
    const result: KeyboardShortcutDto = KeyboardShortcutMapper.toKeyboardShortcutDto(keyboardShortcutMock);
    expect(result).toEqual(keyboardShortcutDtoMock);
  });

  it('should map array of KeyboardShortcutAction to an array of KeyboardShortcutActionDto', () => {
    const result: KeyboardShortcutDto[] = KeyboardShortcutMapper.toKeyboardShortcutDtoList([keyboardShortcutMock]);
    expect(result).toEqual([keyboardShortcutDtoMock]);
  });

  it('should map defaultShortcut as shortcut if shortcut property is undefined', () => {
    const shortcut: KeyboardShortcut = { ...keyboardShortcutMock, shortcut:  undefined } as KeyboardShortcut;
    const result: KeyboardShortcutDto = KeyboardShortcutMapper.toKeyboardShortcutDto(shortcut);
    expect(result.shortcut).toEqual(shortcut.keyboardShortcutAction.defaultShortcut);
  });

  it('should map shortcut property as shortcut when shortcut property is exists', () => {
    const shortcut: KeyboardShortcut = { ...keyboardShortcutMock } as KeyboardShortcut;
    const result: KeyboardShortcutDto = KeyboardShortcutMapper.toKeyboardShortcutDto(shortcut);
    expect(result.shortcut).toEqual(shortcut.shortcut);
  });
});