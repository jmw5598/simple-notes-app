import { Category } from './category.model';
import { Section } from './section.model';
import { Permission } from './permission.enum';

export class Topic {

  public id: number;
  public title: string;
  public synopsis: string;
  public createdAt: Date;
  public updatedAt: Date;
  public permission: Permission;
  public owner: string;
  public tags: Category[]
  public sections: Section[];

  constructor(
    id: number,
    title: string,
    synopsis: string,
    createdAt: Date,
    updatedAt: Date,
    permission: Permission,
    owner: string,
    tags: Category[]
  ) {
    this.id = id;
    this.title = title;
    this.synopsis = synopsis;
    this.createdAt = createdAt;
    this.createdAt = createdAt;
    this.permission = permission;
    this.owner = owner;
    this.tags = tags;
  }

}
