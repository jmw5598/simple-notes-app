import { createAction, props } from '@ngrx/store';
import { Plan } from '../../models';

export const getPlans = createAction(
  '[Plan] Get Plans'
);

export const getPlansSuccess = createAction(
  '[Plan] Get Plans Success',
  props<{ plans: Plan[] }>()
);
