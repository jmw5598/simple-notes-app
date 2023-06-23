import { createFeature, createReducer, on } from '@ngrx/store';
import { AuthenticatedUser, AuthenticatedStatus } from '@sn/shared/models';

import { AuthenticationActions } from './authentication.actions';

export interface IAuthenticationState {
  authenticatedUser: AuthenticatedUser;
  authenticatedStatus: AuthenticatedStatus;
  errorMessage: string;
}

export const initialAuthenticationState: IAuthenticationState = {
  authenticatedUser: null,
  authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
  errorMessage: null,
}

export const authenticationFeature = createFeature({
  name: 'authentication',
  reducer: createReducer(
    initialAuthenticationState,
    on(AuthenticationActions.loginUserSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    };
  }),
  on(AuthenticationActions.loginUserError, (state, { error }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: error.message
    }
  }),
  on(AuthenticationActions.setLoginUserError, (state, { errorMessage }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: errorMessage
    }
  }),
  on(AuthenticationActions.logoutUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: null
    }
  }),
  on(AuthenticationActions.refreshTokenSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    }
  }),
  on(AuthenticationActions.setAuthenticatedUser, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user 
    }
  }),
  on(AuthenticationActions.updateUserSettingsSuccess, (state, { settings }) => {
    const newState: IAuthenticationState = JSON.parse(JSON.stringify(state));
    newState.authenticatedUser.userDetails.settings = { 
      ...newState.authenticatedUser.userDetails.settings,
      ...settings
    };
    return newState;
  })
  )
})
