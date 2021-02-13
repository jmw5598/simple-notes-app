import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ThemeMapper } from '../mappers/theme.mapper'
import { Theme } from '../entities/theme.entity';
import { ThemeDto } from '../dtos/theme.dto';

@Injectable()
export class ThemesService {
  constructor(
    @InjectRepository(Theme)
    private readonly _themeRepository: Repository<Theme>
  ) {}

  public async findAll(): Promise<ThemeDto[]> {
    const themes: Theme[] = await this._themeRepository.find();
    return ThemeMapper.toThemDtoList(themes);
  }
}
