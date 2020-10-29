import { ActionReducer } from '@ngrx/store';
import * as fromActions from '../actions';
import * as fromAuthenticationActions from '@sn/auth/store/actions';

export function resetStateOnLogout(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === fromAuthenticationActions.logoutUser.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
