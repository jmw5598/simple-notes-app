import { createReducer, on } from '@ngrx/store';
import { AuthenticatedUser, AuthenticatedStatus } from '@sn/shared/models';
import { from } from 'rxjs';


import * as fromActions from '../actions';

export const authenticationFeatureKey = 'authentication';

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

const _authenticationReducer = createReducer(
  initialAuthenticationState,
  on(fromActions.loginUserSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    };
  }),
  on(fromActions.loginUserError, (state, { error }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: error.error.message
    }
  }),
  on(fromActions.setLoginUserError, (state, { errorMessage }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: errorMessage
    }
  }),
  on(fromActions.logoutUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: null
    }
  }),
  on(fromActions.refreshTokenSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    }
  }),
  on(fromActions.setAuthenticatedUser, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user 
    }
  }),
  on(fromActions.updateUserSettingsSuccess, (state, { settings }) => {
    const newState: IAuthenticationState = JSON.parse(JSON.stringify(state));
    newState.authenticatedUser.userDetails.settings = { 
      ...newState.authenticatedUser.userDetails.settings,
      ...settings
    };
    return newState;
  })
);

export function authenticationReducer(state, action) {
  return _authenticationReducer(state, action);
}
