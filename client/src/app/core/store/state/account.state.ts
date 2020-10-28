import { Account, Profile, ResponseMessage } from '@sn/core/models';
import { AccountStatus } from '@sn/core/enums';
import { RegistrationResult } from '@sn/core/dtos';

export const accountFeatureKey: string = 'accounts';

export interface IAccountState {
  details: Account,
  status: AccountStatus,
  profile: Profile,
  registrationResult: RegistrationResult,
  passwordRequestResetResult: ResponseMessage,
  passwordResetResult: ResponseMessage
}

export const initialAccountState: IAccountState = {
  details: null,
  status: AccountStatus.INACTIVE,
  profile: null,
  registrationResult: null,
  passwordRequestResetResult: null,
  passwordResetResult: null
}
