import { Roles } from '../enums/roles.enum';
import { UserSettings } from './user-settings.model';

export class UserDetails {
  public id: number;
  public username: string;
  public roles: Roles[];
  public settings: UserSettings;
}
