import { createAction, props } from '@ngrx/store';
import { AuthenticatedUser, UserCredentials } from '@sn/core/models';
import { HttpErrorResponse } from '@angular/common/http';

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
