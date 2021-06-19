import { UserDto } from "../dtos/user.dto";
import { User } from '../../users/entities/user.entity';

export class UserMapper {
  public static toUserDto(user: User): UserDto {
    return {
      id: user.id ? user.id : -1,
      createdAt: user.createdAt,
      updatedAt: user.updatedAt,
      deletedAt: user.deletedAt,
      username: user.username
    } as UserDto;
  }
}