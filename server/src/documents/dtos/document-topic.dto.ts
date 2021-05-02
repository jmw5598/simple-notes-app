import { TopicDto } from "src/topics/dtos/topic.dto";
import { DocumentTopicSectionDto } from "./document-topic-section.dto";

export class DocumentTopicDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public topic: TopicDto;
  public documentTopicSections: DocumentTopicSectionDto[]
}
