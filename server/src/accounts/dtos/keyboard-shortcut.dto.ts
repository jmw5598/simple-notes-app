import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';

export class KeyboardShortcutDto {
  public id: number;
  public action: KeyboardShortcutActionType;
  public description: string;
  public shortcut: string;
}
