import { Controller, Get, UseGuards } from '@nestjs/common';
import { ThemesService } from '../services/themes.service';
import { ThemeDto } from '../dtos/theme.dto';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';

@Controller('themes')
@UseGuards(JwtAuthenticationGuard)
export class ThemesController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _themesService: ThemesService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  public async getAllThemes(): Promise<ThemeDto[]> {
    try {
      return this._themesService.findAll();
    } catch (error) {
      this._logger.error(`Error getting themes!`, error);
      throw error;
    }
  }
}
