import { Account, Profile } from '@sn/core/models';
import { AccountStatus } from '@sn/core/enums';

export const accountFeatureKey: string = 'accounts';

export interface IAccountState {
  details: Account,
  status: AccountStatus,
  profile: Profile
}

export const initialAccountState: IAccountState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null
}
