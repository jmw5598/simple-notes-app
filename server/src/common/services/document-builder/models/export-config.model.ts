import { IsNotEmpty } from 'class-validator';
import { ExportFormat } from '../enums/export-format.enum';

export class ExportConfig {
  @IsNotEmpty()
  public format: ExportFormat

  @IsNotEmpty()
  public includeTopicTitle: boolean = true;

  @IsNotEmpty()
  public includeTopicSynopsis: boolean = true;

  @IsNotEmpty()
  public includeSectionTitle: boolean = true;

  @IsNotEmpty()
  public includeSectionSynopsis: boolean = true;
}
