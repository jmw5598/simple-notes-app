import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Plan, ResponseMessage } from '@sn/shared/models';

export const PlansActions = createActionGroup({
  source: 'Plan',
  events: {
    'Get Plans': emptyProps(),
    'Get Plans Success': props<{ plans: Plan[] }>(),
    'Get Active Plans': emptyProps(),
    'Get Active Plans Success': props<{ plans: Plan[] }>(),
    'Create Plan': props<{ plan: Plan }>(),
    'Create Plan Success': props<{ plan: Plan }>(),
    'Set Create Plan Response Message': props<{ message: ResponseMessage }>(),
    'Update Plan': props<{ planId: number, plan: Plan }>(),
    'Update Plan Success': props<{ plan: Plan }>(),
    'Set Update Plan Response Message': props<{ message: ResponseMessage }>(),
    'Delete Plan': props<{ planId: number }>(),
    'Delete Plan Success': props<{ plan: Plan }>(),
    'Set Delete Plan Response Message': props<{ message: ResponseMessage }>(),
    'Undelete Plan': props<{ planId: number }>(),
    'Undelete Plan Success': props<{ plan: Plan }>(),
  }
});
