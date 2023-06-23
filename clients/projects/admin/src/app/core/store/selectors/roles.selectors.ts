import { createSelector, createFeatureSelector } from '@ngrx/store';
import { IRolesState, rolesFeature } from '../reducers/roles.reducer';

export const selectRolesState = createFeatureSelector<IRolesState>(rolesFeature.name);

export const selectRoles = createSelector(
  selectRolesState,
  (state: IRolesState) => state.roles
);

export const selectActiveRoles = createSelector(
  selectRolesState,
  (state: IRolesState) => state.roles?.filter(role => !role.deletedAt) || []
);

export const selectCreateRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: IRolesState) => state.createRoleResponseMessage
);

export const selectUpdateRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: IRolesState) => state.updateRoleResponseMessage
);

export const selectDeleteRoleResponseMessasge = createSelector(
  selectRolesState,
  (state: IRolesState) => state.deleteRoleResponseMessage
);

export const RolesSelectors = {
  selectActiveRoles,
  selectCreateRoleResponseMessasge,
  selectDeleteRoleResponseMessasge,
  selectRoles,
  selectRolesState,
  selectUpdateRoleResponseMessasge,
}
