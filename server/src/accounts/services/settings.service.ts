import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutDto } from '../dtos/keyboard-shortcut.dto';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutMapper } from '../mappers/keyboard-shortcut.mapper';
import { KeyboardShortcutActionMapper } from '../mappers/keyboard-shortcut-action.mapper';
import { CreateKeyboardShortcutDto } from '../dtos/create-keyboard-shortcut.dto';
import { KeyboardShortcutNotFoundException } from '../exceptions/keyboard-shortcut-not-found.exception';

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
    return KeyboardShortcutActionMapper.toKeyboardShortcutActionDtoList(actions);
  }

  public async createKeyboardShortcut(accountId: number, createKeyboardShortcutDto: CreateKeyboardShortcutDto): Promise<KeyboardShortcutActionDto> {
    const shortcut: KeyboardShortcut = this._keyboardShortcutRepository.create({
      shortcut: createKeyboardShortcutDto.shortcut,
      account: { id: accountId },
      keyboardShortcutAction: { id: createKeyboardShortcutDto.actionId }
    });

    await this._keyboardShortcutRepository.save(shortcut);

    return KeyboardShortcutActionMapper.toKeyboardShortcutActionDto(
      await this._getKeyboardShortcutActionById(accountId, createKeyboardShortcutDto.actionId)
    );
  }

  public async deleteKeyboardShortcut(accountId: number, shortcutId: number): Promise<KeyboardShortcutActionDto> {
    const shortcut: KeyboardShortcut = await this._keyboardShortcutRepository.findOne({
      relations: ['keyboardShortcutAction'],
      where: {
        id: shortcutId,
        account: { id: accountId }
      }
    });

    if (!shortcut) throw new KeyboardShortcutNotFoundException();
    await this._keyboardShortcutRepository.delete(shortcutId);

    return KeyboardShortcutActionMapper.toKeyboardShortcutActionDto(
      await this._getKeyboardShortcutActionById(accountId, shortcut.keyboardShortcutAction.id)
    )
  }

  private async _getKeyboardShortcutActionById(accountId: number, actionId: number): Promise<KeyboardShortcutAction> {
    return this._keyboardShortcutActionRepository
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.keyboardShortcuts', 'shortcut', `shortcut.account_id = :accountId`, {accountId: accountId})
      .where('action.id = :actionId', { actionId: actionId })
      .getOne();
  }
}
