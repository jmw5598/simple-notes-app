import { IsNotEmpty } from 'class-validator';
import { ExportFormat } from '../enums/export-format.enum';

export class ExportConfig {
  @IsNotEmpty()
  public format: ExportFormat

  @IsNotEmpty()
  public includeTopicTitle: boolean;

  @IsNotEmpty()
  public includeTopicSynopsis: boolean;

  @IsNotEmpty()
  public includeSectionTitle: boolean;

  @IsNotEmpty()
  public includeSectionSynopsis: boolean;
}
