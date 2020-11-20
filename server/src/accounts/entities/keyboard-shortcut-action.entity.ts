import { Entity, Column, OneToMany } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity'; 
import { KeyboardShortcutActionType } from '../enums/keyboard-shortcut-action.enum';
import { KeyboardShortcut } from './keyboard-shortcut.entity';

@Entity({ name: 'keyboard_shortcut_action' })
export class KeyboardShortcutAction extends BaseEntity {
  @Column({ nullable: false })
  public action: KeyboardShortcutActionType;

  @Column({ nullable: false })
  public description: string;

  @Column({ name: 'default_shortcut', nullable: false })
  public defaultShortcut: string;

  @OneToMany(type => KeyboardShortcut, shortcut => shortcut.keyboardShortcutAction)
  public keyboardShortcuts: KeyboardShortcut[];
}