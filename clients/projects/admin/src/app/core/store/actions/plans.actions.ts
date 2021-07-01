import { createAction, props } from '@ngrx/store';
import { Plan, ResponseMessage } from '@sn/shared/models';

export const getPlans = createAction(
  '[Plan] Get Plans'
);

export const getPlansSuccess = createAction(
  '[Plan] Get Plans Success',
  props<{ plans: Plan[] }>()
);

export const getActivePlans = createAction(
  '[Plan] Get Active Plans'
);

export const getActivePlansSuccess = createAction(
  '[Plan] Get Active Plans Success',
  props<{ plans: Plan[] }>()
);

export const createPlan = createAction(
  '[Plans] Create Plan',
  props<{ plan: Plan }>()
);

export const createPlanSuccess = createAction(
  '[Plans] Create Plan Success',
  props<{ plan: Plan }>()
);

export const setCreatePlanResponseMessage = createAction(
  '[Plans] Set Create Plan Response Message',
  props<{ message: ResponseMessage }>()
);

export const updatePlan = createAction(
  '[Plans] Update Plan',
  props<{ planId: number, plan: Plan }>()
);

export const updatePlanSuccess = createAction(
  '[Plans] Update Plan Success',
  props<{ plan: Plan }>()
);

export const setUpdatePlanResponseMessage = createAction(
  '[Plans] Set Update Plan Response Message',
  props<{ message: ResponseMessage }>()
);
 
export const deletePlan = createAction(
  '[Plans] Delete Plan',
  props<{ planId: number }>()
);

export const deletePlanSuccess = createAction(
  '[Plans] Delete Plan Success',
  props<{ plan: Plan }>()
);

export const setDeletePlanResponseMessage = createAction(
  '[Plans] Set Delete Plan Response Message',
  props<{ message: ResponseMessage }>()
);

export const undeletePlan = createAction(
  '[Plans] Undelete Plan',
  props<{ planId: number }>()
);

export const undeletePlanSuccess = createAction(
  '[Plans] Undelete Plan Success',
  props<{ plan: Plan }>()
);
