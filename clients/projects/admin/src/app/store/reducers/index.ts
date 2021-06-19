import { InjectionToken } from '@angular/core';
import { MetaReducer, Action, ActionReducerMap } from '@ngrx/store';

import * as fromCore from '../../core/store/reducers';
import * as fromAuth from '../../auth/store/reducers';

import { environment } from '@sn/user/env/environment';

export const rootReducerKey = 'rootReducerKey';

export interface IAppState {
  [fromCore.plansFeatureKey]: fromCore.IPlansState,
  [fromAuth.authenticationFeatureKey]?: fromAuth.IAuthenticationState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<any, Action>>(
  rootReducerKey, {
    factory: () => ({
      [fromCore.plansFeatureKey]: fromCore.planReducer,
      [fromAuth.authenticationFeatureKey]: fromAuth.authenticationReducer
    })
  }
);

export const metaReducers: MetaReducer<IAppState>[] = !environment.production 
  ? [fromCore.resetStateOnLogout] 
  : [fromCore.resetStateOnLogout];
