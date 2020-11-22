import { IsNotEmpty } from 'class-validator';

export class CreateKeyboardShortcutDto {
  @IsNotEmpty()
  public actionId: number;

  @IsNotEmpty()
  public shortcut: string;
}