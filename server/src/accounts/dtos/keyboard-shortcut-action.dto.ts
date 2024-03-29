import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';

export class KeyboardShortcutActionDto {
  public id: number;
  public action: KeyboardShortcutActionType;
  public description: string;
  public defaultShortcut: string;
  public shortcutId: number;
  public shortcut: string;
}
