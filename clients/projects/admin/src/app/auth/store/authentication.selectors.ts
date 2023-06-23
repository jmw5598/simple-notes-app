import { createSelector, createFeatureSelector } from '@ngrx/store';
import { authenticationFeature, IAuthenticationState } from './authentication.reducers'

export const selectAuthenticationState = createFeatureSelector<IAuthenticationState>(authenticationFeature.name);

export const selectAuthenticatedUser = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.authenticatedUser
);

export const selectAuthenticatedUserSettings = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state?.authenticatedUser?.userDetails?.settings
);

export const selectAuthenticatedStatus = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.authenticatedStatus
);

export const selectAuthenticationErrorMessage = createSelector(
  selectAuthenticationState,
  (state: IAuthenticationState) => state.errorMessage
);

export const AuthenticationSelectors = {
  selectAuthenticatedStatus,
  selectAuthenticatedUser,
  selectAuthenticatedUserSettings,
  selectAuthenticationErrorMessage,
  selectAuthenticationState,
};
