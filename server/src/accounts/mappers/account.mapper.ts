import { AccountDto } from "../dtos/account.dto";
import { ProfileDto } from "../dtos/profile.dto";
import { Account } from "../entities/account.entity";
import { ProfileMapper } from "./profile.mapper";
import { UserMapper } from "./user.mapper";

export class AccountMapper {
  public static toAccountDto(account: Account): AccountDto {
    return {
      id: account?.id ? account.id : -1,
      createdAt: account.createdAt,
      updatedAt: account.updatedAt,
      deletedAt: account.deletedAt,
      isConfirmed: account.isConfirmed,
      user: !account?.user ? null : UserMapper.toUserDto(account.user),
      profile: !account?.profile ? null : ProfileMapper.toProfileDto(account.profile)
    } as AccountDto;
  }

  public static toAccountDtoList(accounts: Account[]): AccountDto[] {
    return accounts.map(account => AccountMapper.toAccountDto(account));
  }
}
