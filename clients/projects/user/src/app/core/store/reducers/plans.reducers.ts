import { createReducer, on } from '@ngrx/store';
import { Plan } from '@sn/user/core/models';
import * as fromActions from '../actions';

export const plansFeatureKey = 'plans';

export interface IPlansState {
  plans: Plan[]
};

export const initialPlanState: IPlansState = {
  plans: null
};

const _planReducer = createReducer(
  initialPlanState,
  on(fromActions.getPlansSuccess, (state, { plans }) => {
    return {
      ...state,
      plans: plans
    };
  })
);

export function planReducer(state, action) {
  return _planReducer(state, action);
}
