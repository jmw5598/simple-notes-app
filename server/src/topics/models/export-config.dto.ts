import { IsNotEmpty } from 'class-validator';
import { ExportFormat } from '../enums/export-format.enum';

export class ExportConfig {
  @IsNotEmpty()
  public format: ExportFormat
}
