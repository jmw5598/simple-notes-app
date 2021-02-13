import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromAuth from '../reducers';

export const selectAuthenticationState = createFeatureSelector<fromAuth.IAuthenticationState>(fromAuth.authenticationFeatureKey);

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.authenticatedUser
);

export const selectAuthenticatedUserSettings = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state?.authenticatedUser?.userDetails?.settings
);

export const selectAuthenticatedStatus = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.authenticatedStatus
);

export const selectAuthenticationErrorMessage = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.errorMessage
);

export const selectRegistrationResult = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.registrationResult
);

export const selectPasswordRequestResult = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.passwordRequestResetResult
);

export const selectPasswordResetResult = createSelector(
  selectAuthenticationState,
  (state: fromAuth.IAuthenticationState) => state.passwordResetResult
);