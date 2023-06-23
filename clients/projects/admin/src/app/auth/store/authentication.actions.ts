import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import {  
  UserSettings,
  AuthenticatedUser, 
  UserCredentials } from '@sn/shared/models';

export const AuthenticationActions = createActionGroup({
  source: 'AAuthentication',
  events: { 
    'Login User': props<{ credentials: UserCredentials }>(),
    'Login User Success': props<{ user: AuthenticatedUser }>(),
    'Login User Error': props<{ error: HttpErrorResponse }>(),
    'Set Login User Error': props<{ errorMessage: string }>(),
    'Logout User': emptyProps(),
    'Logout User Success': emptyProps(),
    'Refresh Token': emptyProps(),
    'Refresh Token Success': props<{ user: AuthenticatedUser }>(),
    'Set Authenticated User': props<{ user: AuthenticatedUser }>(),
    'Update User Settings Success': props<{ settings: UserSettings }>(),
  }
});

// export const loginUser = createAction(
//   '[Authentication] Login User',
//   props<{ credentials: UserCredentials }>()
// );

// export const loginUserSuccess = createAction(
//   '[Authentication] Login User Success',
//   props<{ user: AuthenticatedUser }>()
// );

// export const loginUserError = createAction(
//   '[Authentication] Login User Error',
//   props<{ error: HttpErrorResponse }>()
// );

// export const setLoginUserError = createAction(
//   '[Authentication] Set Login User Error',
//   props<{ errorMessage: string }>()
// );

// export const logoutUser = createAction(
//   '[Authentication] Logout User'
// );

// export const logoutUserSuccess = createAction(
//   '[Authentication] Logout User Success'
// );

// export const refreshToken = createAction(
//   '[Authentication] Refresh Token'
// );

// export const refreshTokenSuccess = createAction(
//   '[Authentication] Refresh Token Success',
//   props<{ user: AuthenticatedUser }>()
// );

// export const setAuthenticatedUser = createAction(
//   '[Authentication] Set Authenticated User',
//   props<{ user: AuthenticatedUser }>()
// );

// export const updateUserSettingsSuccess = createAction(
//   '[Authentication] Update User Settings Success',
//   props<{ settings: UserSettings }>()
// );
