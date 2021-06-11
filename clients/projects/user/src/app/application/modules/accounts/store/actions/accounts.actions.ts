import { createAction, props } from '@ngrx/store';
import { Account, Profile, Theme } from '@sn/user/core/models';

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

export const getThemes = createAction(
  '[Themes] Get Themes'
);

export const getThemesSuccess = createAction(
  '[Themes] Get Themes Success',
  props<{ themes: Theme[] }>()
);

export const changeAccountTheme = createAction(
  '[Themes] Change Account Theme',
  props<{ theme: Theme }>()
);

export const changeAccountThemeSuccess = createAction(
  '[Themes] Change Account Theme Success',
  props<{ theme: Theme }>()
);
