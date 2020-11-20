import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../database/entities/base.entity';
import { Account } from './account.entity';
import { KeyboardShortcutAction } from './keyboard-shortcut-action.entity';

@Entity({ name: 'keyboard_shortcut' })
export class KeyboardShortcut extends BaseEntity {
  @Column({ nullable: false })
  public shortcut: string;

  @ManyToOne(type => Account, account => account.keyboardShortcuts)
  @JoinColumn({ name: 'account_id' })
  public account: Account;

  @ManyToOne(type => KeyboardShortcutAction, action => action.keyboardShortcuts)
  @JoinColumn({ name: 'keyboard_shortcut_action_id' })
  public keyboardShortcutAction: KeyboardShortcutAction;
}