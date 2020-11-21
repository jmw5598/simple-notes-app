import { KeyboardShortcutDto } from '../dtos/keyboard-shortcut.dto';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';

export class KeyboardShortcutMapper {
  public static toKeyboardShortcutDto(shortcut: KeyboardShortcut): KeyboardShortcutDto {
    return {
      id: shortcut.id ? shortcut.id : -1,
      action: shortcut?.keyboardShortcutAction?.action,
      description: shortcut?.keyboardShortcutAction?.description,
      shortcut: shortcut.shortcut ? shortcut.shortcut : shortcut?.keyboardShortcutAction?.defaultShortcut
    } as KeyboardShortcutDto;
  }

  public static toKeyboardShortcutDtoList(shortcuts: KeyboardShortcut[]): KeyboardShortcutDto[] {
    return shortcuts.map(shortcut => KeyboardShortcutMapper.toKeyboardShortcutDto(shortcut));
  }
}
