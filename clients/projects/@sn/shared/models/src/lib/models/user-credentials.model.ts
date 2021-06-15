import { Roles } from '../enums/roles.enum';

export class UserCredentials {
  public username: string;
  public password: string;
  public rememberMe: boolean;
  public requestedRole: Roles
}
