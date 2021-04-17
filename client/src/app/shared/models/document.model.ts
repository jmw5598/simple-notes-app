import { DocumentTopic } from './document-topic.model';

export class Document {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public name: string;
  public documentTopics: DocumentTopic[] = [];
}
