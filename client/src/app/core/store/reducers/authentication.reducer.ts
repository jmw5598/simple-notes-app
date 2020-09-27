import { createReducer, on } from '@ngrx/store';
import { AuthenticatedStatus } from '@sn/core/enums';
import { loginUserSuccess, loginUserError, logoutUser, refreshTokenSuccess, setAuthenticatedUser } from '../actions/authentication.actions';
import { initialAuthenticationState } from '../state/authentication.state';

const _authenticationReducer = createReducer(
  initialAuthenticationState,
  on(loginUserSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    };
  }),
  on(loginUserError, (state, { error }) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: error.error.message
    }
  }),
  on(logoutUser, (state) => {
    return {
      ...state,
      authenticatedUser: null,
      authenticatedStatus: AuthenticatedStatus.UNAUTHENTICATED,
      errorMessage: null
    }
  }),
  on(refreshTokenSuccess, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user,
      authenticatedStatus: AuthenticatedStatus.AUTHENTICATED,
      errorMessage: null
    }
  }),
  on(setAuthenticatedUser, (state, { user }) => {
    return {
      ...state,
      authenticatedUser: user 
    }
  })
);

export function authenticationReducer(state, action) {
  return _authenticationReducer(state, action);
}
