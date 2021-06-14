import { createAction, props } from '@ngrx/store';
import { Plan } from '@sn/shared/models';

export const getPlans = createAction(
  '[Plan] Get Plans'
);

export const getPlansSuccess = createAction(
  '[Plan] Get Plans Success',
  props<{ plans: Plan[] }>()
);
