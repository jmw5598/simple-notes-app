import { Permission } from "../enums/permission.enum";

export class TopicDto {
  public id: number;
  public title: string;
  public synopsis: string;
  public permission: Permission;
  public createdAt: Date;
  public updatedAt: Date;
}
