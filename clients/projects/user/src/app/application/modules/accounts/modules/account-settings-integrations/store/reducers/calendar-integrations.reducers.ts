import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { CalendarIntegrationType, CalendarIntegration } from '@sn/user/core/models';

export const calendarIntegrationsFeatureKey = 'calendarIntegrations';

export interface ICalendarIntegrationsState {
  calendarIntegrations: CalendarIntegration[],
  calendarIntegrationTypes: CalendarIntegrationType[],
  calendarIntegrationsGroupedByType: CalendarIntegrationType[]
}

export const initialCalendarIntegrationState: ICalendarIntegrationsState = {
  calendarIntegrations: null,
  calendarIntegrationTypes: null,
  calendarIntegrationsGroupedByType: null
}

const _calendarIntegrationReducer = createReducer(
  initialCalendarIntegrationState,
  on(fromActions.getCalendarIntegrationsGroupedByTypeSuccess, (state, { integrations }) => {
    return {
      ...state,
      calendarIntegrationsGroupedByType: integrations
    }
  }),
  on(fromActions.refreshCalendarIntegrationSuccess, (state, { integration }) => {
    let integrationType: CalendarIntegrationType = state.calendarIntegrationsGroupedByType.find(i => i.id === integration.calendarIntegrationType.id);
    integrationType = { 
      ...integrationType,
      calendarIntegrations: [integration]
    } as CalendarIntegrationType;
    
    const integrationTypes: CalendarIntegrationType[] = state.calendarIntegrationsGroupedByType.map(type => {
      if (type.id === integration.calendarIntegrationType.id) {
        return integrationType;
      }
      return type;
    });
    
    return {
      ...state,
      calendarIntegrationsGroupedByType: integrationTypes
    }
  }),
  on(fromActions.inactiveCalendarIntegrationSucess, (state, { integration }) => {
    const integrationTypes: CalendarIntegrationType[] = state.calendarIntegrationsGroupedByType.map(type => {
      if (type.id === integration.calendarIntegrationType.id) {
        return { ...type, calendarIntegrations: [] } as CalendarIntegrationType;
      }
      return type;
    });
    return {
      ...state,
      calendarIntegrationsGroupedByType: integrationTypes
    }
  })
);

export function calendarIntegrationReducer(state, action) {
  return _calendarIntegrationReducer(state, action);
}
