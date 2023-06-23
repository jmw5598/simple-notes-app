import { InjectionToken } from '@angular/core';
import { MetaReducer, Action, ActionReducerMap, ActionReducer } from '@ngrx/store';

import * as fromCore from '../../core/store/reducers';

import { IAuthenticationState, authenticationFeature } from '../../auth/store';
import { IPlansState, IRolesState, plansFeature, rolesFeature } from '../../core/store/reducers'; 
import { HttpErrorEffects, PlansEffects, RolesEffects } from '@sn/admin/core/store/effects';

import { environment } from '@sn/user/env/environment';

export const rootReducerKey = 'rootReducerKey';

export interface IAppState {
  [plansFeature.name]: IPlansState,
  [rolesFeature.name]: IRolesState,
  [authenticationFeature.name]?:IAuthenticationState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<any, Action>>(
  rootReducerKey, {
    factory: () => ({
      [plansFeature.name]: plansFeature.reducer,
      [rolesFeature.name]: rolesFeature.reducer,
      [authenticationFeature.name]: authenticationFeature.reducer
    })
  }
);

export const metaReducers: MetaReducer<IAppState>[] = !environment.production 
  ? [fromCore.resetStateOnLogout] 
  : [fromCore.resetStateOnLogout];

export const ROOT_EFFECTS: any[] = [
  HttpErrorEffects,
  PlansEffects,
  RolesEffects,
];

export const storeModuleRuntimeChecks = {
  // strictStateImmutability and strictActionImmutability are enabled by default
  strictStateSerializability: true,
  strictActionSerializability: true,
  strictActionWithinNgZone: true,
  strictActionTypeUniqueness: true,
};
