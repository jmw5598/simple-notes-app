import { createFeature, createReducer, on } from '@ngrx/store';
import { ResponseMessage, Role } from '@sn/shared/models';
import { RolesActions } from '../actions';

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

export const rolesFeature = createFeature({
  name: 'roles',
  reducer: createReducer(
    initialRolesState,
    on(RolesActions.getAllRolesSuccess, onGetAllRolesSuccess),
    on(RolesActions.getActiveRolesSuccess, onGetActiveRolesSuccess),
    on(RolesActions.createRoleSuccess, onCreateRoleSuccess),
    on(RolesActions.setCreateRoleResponseMessage, onSetCreateRoleResponseMessage),
    on(RolesActions.updateRoleSuccess, onUpdateRoleSuccess),
    on(RolesActions.setUpdateRoleResponseMessage, onSetUpdateRoleResponseMessage),
    on(RolesActions.deleteRoleSuccess, onDeleteRoleSuccess),
    on(RolesActions.setDeleteRoleResponseMessage, onSetDeleteRoleResponseMessage),
    on(RolesActions.undeleteRoleSuccess, onUndeleteRoleSuccess)
  )
});
