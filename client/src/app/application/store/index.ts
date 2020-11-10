import { InjectionToken } from '@angular/core';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

import * as fromAccounts from '../modules/accounts/store/reducers';
import * as fromCalendarEvents from '../modules/calendar/store/reducers';
import * as fromCalendarIntegrations from '../modules/accounts/modules/account-settings-integrations/store/reducers';
import * as fromDashboard from '../modules/dashboard/store/reducers';
import * as fromDocuments from '../modules/documents/store/reducers';
import * as fromTopics from '../modules/topics/store/reducers';


export const applicationFeatureKey: string = 'application';

export interface IApplicationState {
  [fromAccounts.accountFeatureKey]: fromAccounts.IAccountsState,
  [fromCalendarEvents.calendarEventsFeatureKey]: fromCalendarEvents.ICalendarEventsState,
  [fromCalendarIntegrations.calendarIntegrationsFeatureKey]: fromCalendarIntegrations.ICalendarIntegrationsState,
  [fromDashboard.dashboardFeatureKey]: fromDashboard.IDashboardState,
  [fromDocuments.documentsFeatureKey]: fromDocuments.IDocumentsState,
  [fromTopics.topicsFeatureKey]: fromTopics.ITopicsState,
  [fromTopics.sectionsFeatureKey]: fromTopics.ISectionsState
}

export const applicationReducer = new InjectionToken<ActionReducerMap<IApplicationState>>(applicationFeatureKey, {
  factory: () => ({
    [fromAccounts.accountFeatureKey]: fromAccounts.accountReducer,
    [fromCalendarEvents.calendarEventsFeatureKey]: fromCalendarEvents.calendarEventReducer,
    [fromCalendarIntegrations.calendarIntegrationsFeatureKey]: fromCalendarIntegrations.calendarIntegrationReducer,
    [fromDashboard.dashboardFeatureKey]: fromDashboard.dashboardReducer,
    [fromDocuments.documentsFeatureKey]: fromDocuments.documentReducer,
    [fromTopics.topicsFeatureKey]: fromTopics.topicReducer,
    [fromTopics.sectionsFeatureKey]: fromTopics.sectionReducer
  })
});

export const selectApplicationState = createFeatureSelector<IApplicationState>(applicationFeatureKey);
