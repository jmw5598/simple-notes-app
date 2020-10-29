// import { InjectionToken } from '@angular/core';
// import { MetaReducer, Action, ActionReducerMap } from '@ngrx/store';

// import * as fromState from '../../core/store/state';
// import * as fromReducers from '../../core/store/reducers';
// import { environment } from '@env/environment';

// export interface IAppState {
//   [fromState.authenticationFeatureKey]?: fromState.IAuthenticationState;
//   [fromState.plansFeatureKey]: fromState.IPlanState;
//   [fromState.sectionsFeatureKey]: fromState.ISectionState;
//   [fromState.topicsFeatureKey]: fromState.ITopicState;
//   [fromState.calendarEventsFeatureKey]: fromState.ICalendarEventState;
//   [fromState.calendarIntegrationsFeatureKey]: fromState.ICalendarIntegrationState;
// }

// export const ROOT_REDUCERS = new InjectionToken<ActionReducerMap<any, Action>>(
//   'Root reducers token', {
//     factory: () => ({
//       [fromState.authenticationFeatureKey]: fromReducers.authenticationReducer,
//       [fromState.plansFeatureKey]: fromReducers.planReducer,
//       [fromState.sectionsFeatureKey]: fromReducers.sectionReducer,
//       [fromState.topicsFeatureKey]: fromReducers.topicReducer,
//       [fromState.calendarEventsFeatureKey]: fromReducers.calendarEventReducer,
//       [fromState.calendarIntegrationsFeatureKey]: fromReducers.calendarIntegrationReducer
//     })
//   }
// );

// export const metaReducers: MetaReducer<IAppState>[] = !environment.production 
//   ? [fromReducers.resetStateOnLogout] 
//   : [fromReducers.resetStateOnLogout];