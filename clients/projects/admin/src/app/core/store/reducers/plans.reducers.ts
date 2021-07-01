import { createReducer, on } from '@ngrx/store';
import { Plan, ResponseMessage } from '@sn/shared/models';
import * as fromActions from '../actions';

export const plansFeatureKey = 'plans';

export interface IPlansState {
  plans: Plan[],
  activePlans: Plan[],
  createPlanResponseMessage: ResponseMessage,
  updatePlanResponseMessage: ResponseMessage,
  deletePlanResponseMessage: ResponseMessage
};

export const initialPlanState: IPlansState = {
  plans: null,
  activePlans: null,
  createPlanResponseMessage: null,
  updatePlanResponseMessage: null,
  deletePlanResponseMessage: null
};

const onGetAllPlansSuccess = (state, { plans }) => ({
  ...state,
  plans: plans
} as IPlansState);

const onGetActivePlansSuccess = (state, { plans }) => ({
  ...state,
  activePlans: plans
} as IPlansState);

const onCreatePlanSuccess = (state, { plan }) => ({
  ...state,
  plans: [...state.plans, plan]
} as IPlansState);

const onSetCreatePlanResponseMessage = (state, { message }) => ({
  ...state,
  createPlanResponseMessage: message
} as IPlansState);

const onUpdatePlanSuccess = (state, { plan }) => ({
  ...state,
  plans: state.plans.map(p => {
    if (p.id === plan.id) {
      return plan
    }
    return p;
  })
} as IPlansState);

const onSetUpdatePlanResponseMessage = (state, { message }) => ({
  ...state,
  updatePlanResponseMessage: message
} as IPlansState);

const onDeletePlanSuccess = (state, { plan }) => ({
  ...state,
  plans: state.plans.map(p => {
    if (p.id === plan.id) {
      return plan
    }
    return p;
  })
} as IPlansState);

const onUndeletePlanSuccess = (state, { plan }) => ({
  ...state,
  plans: state.plans.map(p => {
    if (p.id === plan.id) {
      return plan
    }
    return p;
  })
} as IPlansState);

const onSetDeletePlanResponseMessage = (state, { message }) => ({
  ...state,
  deletePlanResponseMessage: message
} as IPlansState);

const _planReducer = createReducer(
  initialPlanState,
  on(fromActions.getPlansSuccess, onGetAllPlansSuccess),
  on(fromActions.getActivePlansSuccess, onGetActivePlansSuccess),
  on(fromActions.createPlanSuccess, onCreatePlanSuccess),
  on(fromActions.setCreatePlanResponseMessage, onSetCreatePlanResponseMessage),
  on(fromActions.updatePlanSuccess, onUpdatePlanSuccess),
  on(fromActions.setUpdatePlanResponseMessage, onSetUpdatePlanResponseMessage),
  on(fromActions.deletePlanSuccess, onDeletePlanSuccess),
  on(fromActions.setDeletePlanResponseMessage, onSetDeletePlanResponseMessage),
  on(fromActions.undeletePlanSuccess, onUndeletePlanSuccess)
);

export function planReducer(state, action) {
  return _planReducer(state, action);
}
