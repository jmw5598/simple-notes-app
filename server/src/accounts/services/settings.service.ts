import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { KeyboardShortcut } from '../entities/keyboard-shortcut.entity';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { KeyboardShortcutAction } from '../entities/keyboard-shortcut-action.entity';
import { KeyboardShortcutActionMapper } from '../mappers/keyboard-shortcut-action.mapper';
import { CreateKeyboardShortcutDto } from '../dtos/create-keyboard-shortcut.dto';
import { KeyboardShortcutNotFoundException } from '../exceptions/keyboard-shortcut-not-found.exception';
import { UpdateKeyboardShortcutDto } from '../dtos/update-keyboard-shortcut.dto';
import { Theme } from 'src/themes/entities/theme.entity';
import { ThemeDto } from 'src/themes/dtos/theme.dto';
import { ThemeNotFoundException } from 'src/themes/exceptions/theme-not-found.exception';
import { Account } from '../entities/account.entity';
import { AccountNotFoundException } from '../exceptions/account-not-found.exception';
import { ThemeMapper } from 'src/themes/mappers/theme.mapper';

@Injectable()
export class SettingsService {
  constructor(
    @InjectRepository(Account)
    private readonly _accountRepository: Repository<Account>,
    @InjectRepository(KeyboardShortcut)
    private readonly _keyboardShortcutRepository: Repository<KeyboardShortcut>,
    @InjectRepository(KeyboardShortcutAction)
    private readonly _keyboardShortcutActionRepository: Repository<KeyboardShortcutAction>,
    @InjectRepository(Theme)
    private readonly _themeRepository: Repository<Theme>
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

  public async updateKeyboardShortcut(
      accountId: number, shortcutId: number, updateKeyboardShortcutDto: UpdateKeyboardShortcutDto): Promise<KeyboardShortcutActionDto> {
    const shortcut: KeyboardShortcut = await this._keyboardShortcutRepository.findOne({
      relations: ['keyboardShortcutAction'],
      where: {
        id: shortcutId,
        account: { id: accountId },
        keyboardShortcutAction: { id: updateKeyboardShortcutDto.actionId }
      }
    });

    if (!shortcut) throw new KeyboardShortcutNotFoundException
    shortcut.shortcut = updateKeyboardShortcutDto.shortcut;
    await this._keyboardShortcutRepository.save(shortcut);

    return KeyboardShortcutActionMapper.toKeyboardShortcutActionDto(
      await this._getKeyboardShortcutActionById(accountId, updateKeyboardShortcutDto.actionId)
    );
  }

  public async deleteKeyboardShortcut(
      accountId: number, shortcutId: number): Promise<KeyboardShortcutActionDto> {
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

  public async changeAccountTheme(accountId: number, themeId: number): Promise<ThemeDto> {
    const account: Account = await this._accountRepository.findOne(accountId);
    if (!account) throw new AccountNotFoundException();

    const theme: Theme = await this._themeRepository.findOne(themeId);
    if (!theme) throw new ThemeNotFoundException();
    
    account.theme = theme;
    this._accountRepository.save(account);

    return ThemeMapper.toThemeDto(theme);
  }


  private async _getKeyboardShortcutActionById(accountId: number, actionId: number): Promise<KeyboardShortcutAction> {
    return this._keyboardShortcutActionRepository
      .createQueryBuilder('action')
      .leftJoinAndSelect('action.keyboardShortcuts', 'shortcut', `shortcut.account_id = :accountId`, {accountId: accountId})
      .where('action.id = :actionId', { actionId: actionId })
      .getOne();
  }
}
