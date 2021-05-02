import { IsNotEmpty } from 'class-validator';
import { TopicDto } from 'src/topics/dtos/topic.dto';
import { DocumentTopicDto } from './document-topic.dto';

export class UpdateDocumentDto {
  @IsNotEmpty()
  public name: string;
  
  @IsNotEmpty()
  public documentTopics: DocumentTopicDto[];
}
