import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutDto } from '../dtos/keyboard-shortcut.dto';
import { KeyboardShortcutMapper } from '../mappers/keyboard-shortcut.mapper';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(KeyboardShortcut)
    private readonly _keyboardShortcutRepository: Repository<KeyboardShortcut>
  ) {}

  public async getKeyboardShortcuts(accountId: number) {
    const shortcuts: KeyboardShortcut[] = await this._keyboardShortcutRepository.find({
      relations: ['keyboardShortcutAction'],
      join: {
        alias: 'shortcut',
        leftJoin: {
          keyboardShortcut: 'shortcut.keyboardShorcutAction'
        }
      },
      where: { 
        account: { id: accountId }
      }
    });
    console.log("shortcuts?: ", shortcuts);
    return KeyboardShortcutMapper.toKeyboardShortcutDtoList(shortcuts);
  }
}
