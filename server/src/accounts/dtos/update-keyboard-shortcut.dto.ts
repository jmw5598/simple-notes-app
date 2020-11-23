import { IsNotEmpty } from 'class-validator';

export class UpdateKeyboardShortcutDto {
  @IsNotEmpty()
  public actionId: number;

  @IsNotEmpty()
  public shortcut: string;
}
