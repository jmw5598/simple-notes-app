import { InjectionToken } from '@angular/core';
import { MetaReducer, Action, ActionReducerMap } from '@ngrx/store';
import * as fromCore from '@sn/core/store/reducers';
import * as fromAuth from '../../auth/store/reducers';
import * as fromPlans from '../../core/store/reducers';
import { environment } from '@env/environment';

export const rootReducerKey = 'rootReducerKey';

export interface IAppState {
  [fromPlans.plansFeatureKey]: fromPlans.IPlansState,
  [fromAuth.authenticationFeatureKey]?: fromAuth.IAuthenticationState;
}

export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<any, Action>>(
  rootReducerKey, {
    factory: () => ({
      [fromPlans.plansFeatureKey]: fromPlans.planReducer,
      [fromAuth.authenticationFeatureKey]: fromAuth.authenticationReducer
    })
  }
);

export const metaReducers: MetaReducer<IAppState>[] = !environment.production 
  ? [fromCore.resetStateOnLogout] 
  : [fromCore.resetStateOnLogout];
