import { UserDto } from "../dtos/user.dto";
import { User } from '../../users/entities/user.entity';
import { RolesMapper } from "src/roles/mappers/roles.mapper";

export class UserMapper {
  public static toUserDto(user: User): UserDto {
    return {
      id: user.id ? user.id : -1,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      username: user.username,
      roles: RolesMapper.toRoleDtoList(user.roles)
    } as UserDto;
  }
}