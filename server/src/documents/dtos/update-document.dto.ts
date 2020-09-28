import { IsNotEmpty } from 'class-validator';
import { SectionDto } from '../../topics/dtos/section.dto';

export class UpdateDocumentDto {
  @IsNotEmpty()
  public name: string;

  public sections: SectionDto[];
}
