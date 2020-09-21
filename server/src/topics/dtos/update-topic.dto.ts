import { IsNotEmpty } from 'class-validator';
import { Permission } from '../enums/permission.enum';

export class UpdateTopicDto {
  @IsNotEmpty()
  public title: string;

  @IsNotEmpty()
  public synopsis: string;

  @IsNotEmpty()
  public permission: Permission;

  // TODO categories....
}
