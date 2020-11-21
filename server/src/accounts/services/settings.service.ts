import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutDto } from '../dtos/keyboard-shortcut.dto';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutMapper } from '../mappers/keyboard-shortcut.mapper';
import { KeyboardShortcutActionMapper } from '../mappers/keyboard-shortcut-action.mapper';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(KeyboardShortcut)
    private readonly _keyboardShortcutRepository: Repository<KeyboardShortcut>,
    @InjectRepository(KeyboardShortcutAction)
    private readonly _keyboardShortcutActionRepository: Repository<KeyboardShortcutAction>
  ) {}

  public async getKeyboardShortcuts(accountId: number): Promise<KeyboardShortcutActionDto[]> {
    const actions: KeyboardShortcutAction[] = await this._keyboardShortcutActionRepository
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.keyboardShortcuts', 'shortcut', `shortcut.account_id = :accountId`, {accountId: accountId})
      .getMany();

    console.log(actions);
    return KeyboardShortcutActionMapper.toKeyboardShortcutActionDtoList(actions);
  }
}
