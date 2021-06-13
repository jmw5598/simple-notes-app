import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action-type.enum';

export class KeyboardShortcutAction {
  public id: number;
  public action: KeyboardShortcutActionType;
  public description: string;
  public defaultShortcut: string;
  public shortcutId: number | null;
  public shortcut: string | null;
}
