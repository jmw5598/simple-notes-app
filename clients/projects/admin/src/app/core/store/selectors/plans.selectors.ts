import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPlans from '../reducers/plans.reducers';

export const selectPlanState = createFeatureSelector<fromPlans.IPlansState>(fromPlans.plansFeatureKey);

export const selectPlans = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.plans
);

// Update this and just filter all plans where deletedAt is null
export const selectActivePlans = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.activePlans
);

export const selectCreatePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.createPlanResponseMessage
);

export const selectUpdatePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.updatePlanResponseMessage
);

export const selectDeletePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.deletePlanResponseMessage
);
