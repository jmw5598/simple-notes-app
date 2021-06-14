import { createSelector, createFeatureSelector } from '@ngrx/store';
import * as fromPlans from '../reducers/plans.reducers';

export const selectPlanState = createFeatureSelector<fromPlans.IPlansState>(fromPlans.plansFeatureKey);

export const selectPlans = createSelector(
  selectPlanState,
  (state: fromPlans.IPlansState) => state.plans
);
