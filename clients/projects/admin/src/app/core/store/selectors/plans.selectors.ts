import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IPlansState, plansFeature } from '../reducers/plans.reducers';

export const selectPlanState = createFeatureSelector<IPlansState>(plansFeature.name);

export const selectPlans = createSelector(
  selectPlanState,
  (state: IPlansState) => state.plans
);

// Update this and just filter all plans where deletedAt is null
export const selectActivePlans = createSelector(
  selectPlanState,
  (state: IPlansState) => state.activePlans
);

export const selectCreatePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: IPlansState) => state.createPlanResponseMessage
);

export const selectUpdatePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: IPlansState) => state.updatePlanResponseMessage
);

export const selectDeletePlanResponseMessasge = createSelector(
  selectPlanState,
  (state: IPlansState) => state.deletePlanResponseMessage
);

export const PlansSelectors = {
  selectActivePlans,
  selectCreatePlanResponseMessasge,
  selectDeletePlanResponseMessasge,
  selectPlanState,
  selectPlans,
  selectUpdatePlanResponseMessasge,
}
