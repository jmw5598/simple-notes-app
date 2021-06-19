import { Role } from "../../users/entities/role.entity";
import { RoleDto } from "../dtos/role.dto";

export class RolesMapper {
  public static toRoleDto(role: Role): RoleDto {
    return {
      id: role.id,
      name: role.name
    } as RoleDto
  }

  public static toRoleDtoList(roles: Role[]): RoleDto[] {
    return roles.map(role => RolesMapper.toRoleDto(role));
  }
}
