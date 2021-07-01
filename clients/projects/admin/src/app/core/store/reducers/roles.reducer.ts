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

const onCreateRoleSuccess = (state, { role }) => ({
  ...state,
  roles: [...state.roles, role]
});

const onSetUpdateRoleResponseMessage = (state, { message }) => ({
  ...state,
  updateRoleResponseMessage: message
});

const onUpdateRoleSuccess = (state, { role }) => ({
  ...state,
  roles: state.roles.map(r => {
    if (r.id === role.id) {
      return role
    }
    return r;
  })
});

const onSetDeleteRoleResponseMessage = (state, { message }) => ({
  ...state,
  deleteRoleResponseMessage: message
});

const onDeleteRoleSuccess = (state, { role }) => ({
  ...state,
  roles: state.roles.map(r => {
    if (r.id === role.id) {
      return role
    }
    return r;
  })
});

const onUndeleteRoleSuccess = (state, { role }) => ({
  ...state,
  roles: state.roles.map(r => {
    if (r.id === role.id) {
      return role
    }
    return r;
  })
});

const _rolesReducer = createReducer(
  initialRolesState,
  on(fromActions.getAllRolesSuccess, onGetAllRolesSuccess),
  on(fromActions.getActiveRolesSuccess, onGetActiveRolesSuccess),
  on(fromActions.createRoleSuccess, onCreateRoleSuccess),
  on(fromActions.setCreateRoleResponseMessage, onSetCreateRoleResponseMessage),
  on(fromActions.updateRoleSuccess, onUpdateRoleSuccess),
  on(fromActions.setUpdateRoleResponseMessage, onSetUpdateRoleResponseMessage),
  on(fromActions.deleteRoleSuccess, onDeleteRoleSuccess),
  on(fromActions.setDeleteRoleResponseMessage, onSetDeleteRoleResponseMessage),
  on(fromActions.undeleteRoleSuccess, onUndeleteRoleSuccess)
)

export function rolesReducer(state, action) {
  return _rolesReducer(state, action);
}
