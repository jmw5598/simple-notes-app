import { KeyboardShortcutActionMapper } from './keyboard-shortcut-action.mapper'
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';

describe('KeyboardShortcutActionMapper', () => {
  const keyboardShortcutMock: KeyboardShortcut = {
    id: 1,
    shortcut: 'alt + d'
  } as KeyboardShortcut;

  const keyboardShortcutActionMock: KeyboardShortcutAction = {
    id: 1,
    action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
    defaultShortcut: 'alt + c',
    description: 'Create new calendar event',
    keyboardShortcuts: [keyboardShortcutMock]
  } as KeyboardShortcutAction;

  const keyboardShortcutActionDtoMock: KeyboardShortcutActionDto = {
    id: keyboardShortcutActionMock.id,
    action: KeyboardShortcutActionType.CREATE_CALENDAR_EVENT,
    defaultShortcut: keyboardShortcutActionMock.defaultShortcut,
    description: keyboardShortcutActionMock.description,
    shortcut: keyboardShortcutMock.shortcut,
    shortcutId: keyboardShortcutMock.id
  } as KeyboardShortcutActionDto;

  it('should map single KeyboardShortcutAction to a KeyboardShortcutActionDto', () => {
    const result: KeyboardShortcutActionDto = KeyboardShortcutActionMapper.toKeyboardShortcutActionDto(keyboardShortcutActionMock);
    expect(result).toEqual(keyboardShortcutActionDtoMock);
  });

  it('should map array of KeyboardShortcutAction to an array KeyboardShortcutActionDto', () => {
    const results: KeyboardShortcutActionDto[] = KeyboardShortcutActionMapper.toKeyboardShortcutActionDtoList([keyboardShortcutActionMock]);
    expect(results).toEqual([keyboardShortcutActionDtoMock]);
  });
});
