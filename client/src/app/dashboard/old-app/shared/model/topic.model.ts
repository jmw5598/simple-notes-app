import { Category } from './category.model';
import { Section } from './section.model';
import { Permission } from './permission.enum';

export class Topic {

  public id: number;
  public title: string;
  public synopsis: string;
  public createdOn: Date;
  public lastModified: Date;
  public permission: Permission;
  public owner: string;
  public tags: Category[]
  public sections: Section[];

  constructor(
    id: number,
    title: string,
    synopsis: string,
    createdOn: Date,
    lastModified: Date,
    permission: Permission,
    owner: string,
    tags: Category[]
  ) {
    this.id = id;
    this.title = title;
    this.synopsis = synopsis;
    this.createdOn = createdOn;
    this.lastModified = lastModified;
    this.permission = permission;
    this.owner = owner;
    this.tags = tags;
  }

}
