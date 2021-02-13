import { ThemeDto } from '../dtos/theme.dto';
import { Theme } from '../entities/theme.entity';

export class ThemeMapper {
  public static toThemeDto(theme: Theme): ThemeDto {
    return {
      id: theme.id,
      name: theme.name,
      filename: theme.filename,
      cssClassName: theme.cssClassName
    } as ThemeDto;
  }

  public static toThemDtoList(themes: Theme[]): ThemeDto[] {
    return themes.map(theme => ThemeMapper.toThemeDto(theme));
  }
}
