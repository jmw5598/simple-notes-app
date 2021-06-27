import { createReducer, on } from '@ngrx/store';
import { ResponseMessage, Role } from '@sn/shared/models';
import * as fromActions from '../actions/roles.actions';

export const rolesFeatureKey = 'roles';

export interface IRolesState {
  roles: Role[],
  activeRoles: Role[],
  createRoleResponseMessage: ResponseMessage,
  updateRoleResponseMessage: ResponseMessage,
  deleteRoleResponseMessage: ResponseMessage
}

export const initialRolesState: IRolesState = {
  roles: null,
  activeRoles: null,
  createRoleResponseMessage: null,
  updateRoleResponseMessage: null,
  deleteRoleResponseMessage: null
}

const onGetAllRolesSuccess = (state, { roles }) => ({
  ...state,
  roles: roles
});

const onGetActiveRolesSuccess = (state, { roles }) => ({
  ...state,
  activeRoles: roles
})

const onSetCreateRoleResponseMessage = (state, { message }) => ({
  ...state,
  createRoleResponseMessage: message
});

const onSetUpdateRoleResponseMessage = (state, { message }) => ({
  ...state,
  updateRoleResponseMessage: message
});

const onSetDeleteRoleResponseMessage = (state, { message }) => ({
  ...state,
  deleteRoleResponseMessage: message
});

const _rolesReducer = createReducer(
  initialRolesState,
  on(fromActions.getAllRolesSuccess, onGetAllRolesSuccess),
  on(fromActions.getActiveRolesSuccess, onGetActiveRolesSuccess),
  on(fromActions.setCreateRoleResponseMessage, onSetCreateRoleResponseMessage),
  on(fromActions.setUpdateRoleResponseMessage, onSetUpdateRoleResponseMessage),
  on(fromActions.setDeleteRoleResponseMessage, onSetDeleteRoleResponseMessage),
)

export function rolesReducer(state, action) {
  return _rolesReducer(state, action);
}
