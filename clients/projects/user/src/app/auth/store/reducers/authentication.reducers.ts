import { createReducer, on } from '@ngrx/store';
import { 
  AuthenticatedUser,
  ResponseMessage,
  AuthenticatedStatus,
  RegistrationResult } from '@sn/shared/models';


import * as fromActions from '../actions';

export const authenticationFeatureKey = 'authentication';

export interface IAuthenticationState {
  authenticatedUser: AuthenticatedUser;
  authenticatedStatus: AuthenticatedStatus;
  errorMessage: string;
  registrationResult: RegistrationResult,
  passwordRequestResetResult: ResponseMessage,
  passwordResetResult: ResponseMessage
}

export const initialAuthenticationState: IAuthenticationState = {
  authenticatedUser: null,
  authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
  errorMessage: null,
  registrationResult: null,
  passwordRequestResetResult: null,
  passwordResetResult: null
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
  on(fromActions.registerNewAccountResult, (state, { result }) => {
    return {
      ...state,
      registrationResult: result 
    }
  }),
  on(fromActions.passwordRequestResetResult, (state, { result }) => {
    return {
      ...state,
      passwordRequestResetResult: result 
    }
  }),
  on(fromActions.passwordResetResult, (state, { result }) => {
    return {
      ...state,
      passwordResetResult: result
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
