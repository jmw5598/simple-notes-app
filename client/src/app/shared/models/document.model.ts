import { Section } from './section.model';

export class Document {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public name: string;
  public sections: Section[];
}
