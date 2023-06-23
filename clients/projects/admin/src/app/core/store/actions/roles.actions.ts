import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { ResponseMessage, Role } from '@sn/shared/models';

export const RolesActions = createActionGroup({
  source: 'Roles',
  events: {
    'Get All Roles': emptyProps(),
    'Get All Roles Success': props<{ roles: Role[] }>(),
    'Get Active Roles': emptyProps(),
    'Get Active Roles Success': props<{ roles: Role[] }>(),
    'Create Role': props<{ role: Role }>(),
    'Create Role Success': props<{ role: Role }>(),
    'Set Create Role Response Message': props<{ message: ResponseMessage }>(),
    'Update Role': props<{ roleId: number, role: Role }>(),
    'Update Role Success': props<{ role: Role }>(),
    'Set Update Role Response Message': props<{ message: ResponseMessage }>(),
    'Delete Role': props<{ roleId: number }>(),
    'Delete Role Success': props<{ role: Role }>(),
    'Set Delete Role Response Message': props<{ message: ResponseMessage }>(),
    'Undelete Role': props<{ roleId: number }>(),
    'Undelete Role Success': props<{ role: Role }>(),
  }
});
 