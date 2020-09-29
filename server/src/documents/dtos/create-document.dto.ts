import { IsNotEmpty } from 'class-validator';
import { SectionDto } from '../../topics/dtos/section.dto';

export class CreateDocumentDto {
  @IsNotEmpty()
  public name: string;

  public sections: SectionDto[];
}
