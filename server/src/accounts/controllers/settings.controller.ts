import { Controller, Request, Get, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { SettingsService } from '../services/settings.service';

@Controller('accounts/settings')
@UseGuards(JwtAuthenticationGuard)
export class SettingsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _settingsService: SettingsService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get('shortcuts')
  public async getKeyboardShortcuts(@Request() request): Promise<any> {
    try {
      const accountId: number = +request.user.accountId;
      return this._settingsService.getKeyboardShortcuts(accountId);
    } catch (error) {
      this._logger.error(`Error getting keyboard shortcuts`, error);
      throw error;
    }
  }
}
