import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromState from '../state';

export const selectAuthenticationState = createFeatureSelector<fromState.IAuthenticationState>(fromState.authenticationFeatureKey);

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.authenticatedUser
);

export const selectAuthenticatedStatus = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.authenticatedStatus
);

export const selectAuthenticationErrorMessage = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.errorMessage
);

export const selectRegistrationResult = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.registrationResult
);

export const selectPasswordRequestResult = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.passwordRequestResetResult
);

export const selectPasswordResetResult = createSelector(
  selectAuthenticationState,
  (state: fromState.IAuthenticationState) => state.passwordResetResult
);