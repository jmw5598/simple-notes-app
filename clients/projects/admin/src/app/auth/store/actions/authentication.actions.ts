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

export const updateUserSettingsSuccess = createAction(
  '[Authentication] Update User Settings',
  props<{ settings: UserSettings }>()
);
