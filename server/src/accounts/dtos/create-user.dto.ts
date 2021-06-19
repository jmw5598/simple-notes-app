import { IsNotEmpty } from 'class-validator';
import { Roles } from 'src/authentication/models/roles.enum';

export class CreateUserDto {
  @IsNotEmpty()
  public username: string;

  @IsNotEmpty()
  public password: string;

  @IsNotEmpty()
  public passwordConfirm: string;

  public roles: Roles[];
}