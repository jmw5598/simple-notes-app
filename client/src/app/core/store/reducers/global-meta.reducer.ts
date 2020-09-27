import { ActionReducer } from '@ngrx/store';
import * as fromActions from '../actions';

export function resetStateOnLogout(reducer: ActionReducer<any>): ActionReducer<any> {
  return function (state, action) {
    if (action.type === fromActions.logoutUser.type) {
      state = undefined;
    }
    return reducer(state, action);
  };
}
