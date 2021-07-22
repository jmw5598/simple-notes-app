import { RoleDto } from "../../roles/dtos/role.dto";

export class UserDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public username: string;
  public roles: RoleDto[];
}
