import { ExportFormat } from '../enums/export-format.enum';

export class ExportConfig {
  public format: ExportFormat;
  public includeTopicTitle: boolean;
  public includeTopicSynopsis: boolean;
  public includeSectionTitle: boolean;
  public includeSectionSynopsis: boolean;
}
