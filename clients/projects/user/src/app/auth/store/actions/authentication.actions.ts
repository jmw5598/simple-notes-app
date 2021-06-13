import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { 
  RegistrationResult, 
  Registration, 
  UserSettings,
  AuthenticatedUser, 
  UserCredentials, 
  PasswordReset, 
  PasswordRequestReset, 
  ResponseMessage} from '@sn/shared/models';

export const loginUser = createAction(
  '[Authentication] Login User',
  props<{ credentials: UserCredentials }>()
);

export const loginUserSuccess = createAction(
  '[Authentication] Login User Success',
  props<{ user: AuthenticatedUser }>()
);

export const loginUserError = createAction(
  '[Authentication] Login User Error',
  props<{ error: HttpErrorResponse }>()
);

export const logoutUser = createAction(
  '[Authentication] Logout User'
);

export const logoutUserSuccess = createAction(
  '[Authentication] Logout User Success'
);

export const refreshToken = createAction(
  '[Authentication] Refresh Token'
);

export const refreshTokenSuccess = createAction(
  '[Authentication] Refresh Token Success',
  props<{ user: AuthenticatedUser }>()
);

export const setAuthenticatedUser = createAction(
  '[Authentication] Set Authenticated User',
  props<{ user: AuthenticatedUser }>()
);

export const registerNewAccount = createAction(
  '[Authentication] Register New Account',
  props<{ registration: Registration }>()
);

export const registerNewAccountResult = createAction(
  '[Authentication] Register New Account Result',
  props<{ result: RegistrationResult }>()
);

export const passwordRequestReset = createAction(
  '[Authentication] Password Request Reset',
  props<{ request: PasswordRequestReset }>()
);

export const passwordRequestResetResult = createAction(
  '[Authentication] Password Request Reset Result',
  props<{ result: ResponseMessage }>()
);

export const passwordReset = createAction(
  '[Authentication] Password Reset',
  props<{ request: PasswordReset }>()
);

export const passwordResetResult = createAction(
  '[Authentication] Password Reset Result',
  props<{ result: ResponseMessage }>()
);

export const updateUserSettingsSuccess = createAction(
  '[Authentication] Update User Settings',
  props<{ settings: UserSettings }>()
);
