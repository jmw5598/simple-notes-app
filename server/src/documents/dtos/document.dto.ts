import { SectionDto } from '../../topics/dtos/section.dto';

export class DocumentDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public name: string;
  public sections: SectionDto[];
}
