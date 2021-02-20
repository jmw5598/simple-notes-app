import { Controller, Request, Get, UseGuards, Post, Body, Delete, Param, Put } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { SettingsService } from '../services/settings.service';
import { KeyboardShortcutActionDto } from '../dtos/keyboard-shortcut-action.dto';
import { CreateKeyboardShortcutDto } from '../dtos/create-keyboard-shortcut.dto';
import { UpdateKeyboardShortcutDto } from '../dtos/update-keyboard-shortcut.dto';
import { ThemeDto } from '../../themes/dtos/theme.dto';

@Controller('accounts/settings')
@UseGuards(JwtAuthenticationGuard)
export class SettingsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _settingsService: SettingsService,
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get('shortcuts')
  public async getKeyboardShortcuts(@Request() request): Promise<KeyboardShortcutActionDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._settingsService.getKeyboardShortcuts(accountId);
    } catch (error) {
      this._logger.error(`Error getting keyboard shortcuts`, error);
      throw error;
    }
  }

  @Post('shortcuts')
  public async createKeyboardShortcut(
      @Request() request, 
      @Body() createKeyboardShortcutDto: CreateKeyboardShortcutDto): Promise<KeyboardShortcutActionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._settingsService.createKeyboardShortcut(accountId, createKeyboardShortcutDto);
    } catch (error) {
      this._logger.error(`Error creating keyboard shortcut!`, error);
      throw error;
    }
  }

  @Put('shortcuts/:shortcutId')
  public async updateKeyboardShortcut(
      @Request() request,
      @Param('shortcutId') shortcutId: number,
      @Body() updateKeyboardShortcutDto: UpdateKeyboardShortcutDto): Promise<KeyboardShortcutActionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._settingsService.updateKeyboardShortcut(accountId, shortcutId, updateKeyboardShortcutDto);
    } catch (error) {
      this._logger.error(`Error updating keyboard shortcut!`, error);
      throw error;
    }
  }

  @Delete('shortcuts/:shortcutId')
  public async deleteKeyboardShortcut(
      @Request() request, 
      @Param('shortcutId') shortcutId: number): Promise<KeyboardShortcutActionDto> {
    try {
       const accountId: number = +request.user.accountId;
       return this._settingsService.deleteKeyboardShortcut(accountId, shortcutId);
    } catch (error) {
      this._logger.error(`Error deleting keyboard shortcut!`, error);
      throw error;
    }
  }

  @Put('themes/:themeId')
  public async changeAccountTheme(
      @Request() request,
      @Param('themeId') themeId: number): Promise<ThemeDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._settingsService.changeAccountTheme(accountId, themeId);
    } catch (error) {
      this._logger.error(`Error changing account theme`, error);
      throw error;
    }
  }
}
