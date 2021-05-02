import { DocumentTopicDto } from './document-topic.dto';

export class DocumentDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public name: string;
  public documentTopics: DocumentTopicDto[];
}
