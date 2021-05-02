import { SectionDto } from "src/topics/dtos/section.dto";

export class DocumentTopicSectionDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public section: SectionDto;
}
