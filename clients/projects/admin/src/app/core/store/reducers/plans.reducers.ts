import { createFeature, createReducer, on } from '@ngrx/store';
import { Plan, ResponseMessage } from '@sn/shared/models';
import { PlansActions } from '../actions';

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
  
);


export const plansFeature = createFeature({
  name: 'plans',
  reducer: createReducer(
    initialPlanState,
    on(PlansActions.getPlansSuccess, onGetAllPlansSuccess),
    on(PlansActions.getActivePlansSuccess, onGetActivePlansSuccess),
    on(PlansActions.createPlanSuccess, onCreatePlanSuccess),
    on(PlansActions.setCreatePlanResponseMessage, onSetCreatePlanResponseMessage),
    on(PlansActions.updatePlanSuccess, onUpdatePlanSuccess),
    on(PlansActions.setUpdatePlanResponseMessage, onSetUpdatePlanResponseMessage),
    on(PlansActions.deletePlanSuccess, onDeletePlanSuccess),
    on(PlansActions.setDeletePlanResponseMessage, onSetDeletePlanResponseMessage),
    on(PlansActions.undeletePlanSuccess, onUndeletePlanSuccess)
  )
});
