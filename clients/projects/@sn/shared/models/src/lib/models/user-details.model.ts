import { UserSettings } from './user-settings.model';

export class UserDetails {
  public id: number;
  public username: string;
  public roles: string[];
  public settings: UserSettings;
}
