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
});

const onGetActivePlansSuccess = (state, { plans }) => ({
  ...state,
  activePlans: plans
})

const onSetCreatePlanResponseMessage = (state, { message }) => ({
  ...state,
  createPlanResponseMessage: message
});

const onSetUpdatePlanResponseMessage = (state, { message }) => ({
  ...state,
  updatePlanResponseMessage: message
});

const onSetDeletePlanResponseMessage = (state, { message }) => ({
  ...state,
  deletePlanResponseMessage: message
});

const _planReducer = createReducer(
  initialPlanState,
  on(fromActions.getPlansSuccess, onGetAllPlansSuccess),
  on(fromActions.getActivePlansSuccess, onGetActivePlansSuccess),
  on(fromActions.setCreatePlanResponseMessage, onSetCreatePlanResponseMessage),
  on(fromActions.setUpdatePlanResponseMessage, onSetUpdatePlanResponseMessage),
  on(fromActions.setDeletePlanResponseMessage, onSetDeletePlanResponseMessage),
);

export function planReducer(state, action) {
  return _planReducer(state, action);
}
