import { createReducer, on } from '@ngrx/store';
import { AuthenticatedStatus } from '@sn/core/enums';

import * as fromActions from '../actions';
import * as fromState from '../state';

export const authenticationReducer = createReducer(
  fromState.initialAuthenticationState,
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
);

// export function authenticationReducer(state, action) {
//   return _authenticationReducer(state, action);
// }
