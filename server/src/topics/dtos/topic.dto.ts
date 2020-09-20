import { Permission } from "../enums/permission.enum";
import { SectionDto } from '../dtos/section.dto';

export class TopicDto {
  public id: number;
  public title: string;
  public synopsis: string;
  public permission: Permission;
  public createdAt: Date;
  public updatedAt: Date;
  public sections: SectionDto[];
  public owner: string;
}
