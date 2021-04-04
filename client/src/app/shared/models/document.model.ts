import { Section } from './section.model';
import { Topic } from './topic.model';

export class Document {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public name: string;
  public topics: Topic[];
  public sections: Section[];
}
