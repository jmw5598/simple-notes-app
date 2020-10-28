import { createAction, props } from '@ngrx/store';
import { ResponseMessage, CalendarIntegration, CalendarIntegrationType } from '../../models';

export const authorizeGoogleCalendarIntegration = createAction(
  '[Calendar Integrations] Authorize Google Calendar Integration'
);

// TODO Remove, probably won't need it.
export const authorizeGoogleCalendarIntegrationSuccess = createAction(
  '[Calendar Integration] Authorize Google Calendar Integration Success'
);

export const getCalendarIntegrationsGroupedByType = createAction(
  '[Calendar Integration] Get Calendar Integrations Grouped By Type'
);

export const getCalendarIntegrationsGroupedByTypeSuccess = createAction(
  '[Calendar Integration] Get Calendar Integrations Grouped By Type Success',
  props<{ integrations: CalendarIntegrationType[] }>()
);

export const createGoogleCalendarIntegration = createAction(
  '[Calendar Integration] Create Google Calendar Integration',
  props<{ code: string }>()
);

export const createGoogleCalendarIntegrationSuccess = createAction(
  '[Calendar Integration] Create Google Calendar Integration Success',
  props<{ response: ResponseMessage }>()
);

export const refreshCalendarIntegration = createAction(
  '[Calendar Integration] Refresh Calendar Integration',
  props<{ integration: CalendarIntegration }>()
);

export const refreshCalendarIntegrationSuccess = createAction(
  '[Calendar Integration] Refresh Calendar Integration Success',
  props<{ integration: CalendarIntegration }>() 
);

export const inactiveCalendarIntegration = createAction(
  '[Calendar Integration] Inactivate Calendar Integration',
  props<{ id: number }>()
);

export const inactiveCalendarIntegrationSucess = createAction(
  '[Calendar Integration] Inactivate Calendar Integration Success',
  props<{ integration: CalendarIntegration }>()
);
