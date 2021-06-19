import { createAction, props } from '@ngrx/store';
import { ResponseMessage, Role } from '@sn/shared/models';

export const getAllRoles = createAction(
  '[Roles] Get All Roles'
);

export const getAllRolesSuccess = createAction(
  '[Roles] Get All Roles Success',
  props<{ roles: Role[] }>()
);

export const createRole = createAction(
  '[Roles] Create Role',
  props<{ role: Role }>()
);

export const createRoleSuccess = createAction(
  '[Roles] Create Role Success',
  props<{ role: Role }>()
);

export const setCreateRoleResponseMessage = createAction(
  '[Roles] Set Create Role Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateRole = createAction(
  '[Roles] Update Role',
  props<{ roleId: number, role: Role }>()
);

export const updateRoleSuccess = createAction(
  '[Roles] Update Role Success',
  props<{ role: Role }>()
);

export const setUpdateRoleResponseMessage = createAction(
  '[Roles] Set Update Role Response Message',
  props<{ message: ResponseMessage }>()
);
 
export const deleteRole = createAction(
  '[Roles] Delete Role',
  props<{ roleId: number }>()
);

export const deleteRoleSuccess = createAction(
  '[Roles] Delete Role Success',
  props<{ role: Role }>()
);

export const setDeleteRoleResponseMessage = createAction(
  '[Roles] Set Delete Role Response Message',
  props<{ message: ResponseMessage }>()
);
 