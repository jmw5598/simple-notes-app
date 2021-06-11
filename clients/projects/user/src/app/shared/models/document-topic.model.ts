import { Topic } from './topic.model';
import { DocumentTopicSection } from './document-topic-section.model';

export class DocumentTopic {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public topic: Topic
  public documentTopicSections: DocumentTopicSection[];
}
