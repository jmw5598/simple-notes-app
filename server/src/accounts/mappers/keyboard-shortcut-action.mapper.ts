import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';

export class KeyboardShortcutActionMapper {
  public static toKeyboardShortcutActionDto(action: KeyboardShortcutAction): KeyboardShortcutActionDto {
    return {
      id: action.id,
      action: action.action,
      description: action.description,
      defaultShortcut: action.defaultShortcut,
      shortcutId: action.keyboardShortcuts.length > 0 ? action.keyboardShortcuts[0].id : null,
      shortcut: action.keyboardShortcuts.length > 0 ? action.keyboardShortcuts[0].shortcut : null
    } as KeyboardShortcutActionDto;
  }

  public static toKeyboardShortcutActionDtoList(actions: KeyboardShortcutAction[]): KeyboardShortcutActionDto[] {
    return actions.map(action => KeyboardShortcutActionMapper.toKeyboardShortcutActionDto(action));
  }
}
