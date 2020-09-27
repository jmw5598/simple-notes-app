import { createAction, props } from '@ngrx/store';
import { Account, Profile, PasswordRequestReset, PasswordReset, ResponseMessage } from '@sn/core/models';
import { Registration, RegistrationResult } from '@sn/core/dtos';

export const getAccountDetails = createAction(
  '[Account] Get Account Details'
);

export const getAccountDetailsSuccess = createAction(
  '[Account] Get Account Details Success',
  props<{account: Account}>()
);

export const getAccountProfile = createAction(
  '[Account] Get Account Profile'
);

export const getAccountProfileSuccess = createAction(
  '[Account] Get Account Profile Success',
  props<{ profile: Profile }>()
);

export const registerNewAccount = createAction(
  '[Acount] Register New Account',
  props<{ registration: Registration }>()
);

export const registerNewAccountResult = createAction(
  '[Account] Register New Account Result',
  props<{ result: RegistrationResult }>()
);

export const passwordRequestReset = createAction(
  '[Account] Password Request Reset',
  props<{ request: PasswordRequestReset }>()
);

export const passwordRequestResetResult = createAction(
  '[Account] Password Request Reset Result',
  props<{ result: ResponseMessage }>()
);

export const passwordReset = createAction(
  '[Account] Password Reset',
  props<{ request: PasswordReset }>()
);

export const passwordResetResult = createAction(
  '[Account] Password Reset Result',
  props<{ result: ResponseMessage }>()
);

export const updateAccountDetails = createAction(
  '[Account] Update Account Details',
  props<{ account: Account }>()
);

export const updateAccountDetailsSuccess = createAction(
  '[Account] Update Account Details Success',
  props<{ account: Account}>()
);

export const updateAccountProfile = createAction(
  '[Account] Update Account Profile',
  props<{ profile: Profile }>()
);

export const updateAccountProfileSuccess = createAction(
  '[Account] Update Account Profile Success',
  props<{ profile: Profile}>()
);
