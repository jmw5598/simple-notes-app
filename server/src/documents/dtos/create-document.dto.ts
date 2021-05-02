import { IsNotEmpty } from 'class-validator';
import { DocumentTopicDto } from './document-topic.dto';

export class CreateDocumentDto {
  @IsNotEmpty()
  public name: string;

  public documentTopics: DocumentTopicDto[];
}
