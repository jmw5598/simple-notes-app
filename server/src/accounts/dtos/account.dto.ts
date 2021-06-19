import { Plan } from "src/plans/entities/plan.entity";
import { ProfileDto } from "./profile.dto";
import { UserDto } from "./user.dto";

export class AccountDto {
  public id: number;
  public createdAt: Date;
  public updatedAt: Date;
  public deletedAt: Date;
  public plan: Plan;
  public isConfirmed: boolean;
  public isEnabled: boolean;
  public profile: ProfileDto;
  public user: UserDto;
}
