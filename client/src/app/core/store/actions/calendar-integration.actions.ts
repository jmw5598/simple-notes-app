import { createAction, props } from '@ngrx/store';
import { ResponseMessage } from '@sn/core/models';

export const authorizeGoogleCalendarIntegration = createAction(
  '[Calendar Integrations] Authorize Google Calendar Integration'
);

// TODO Remove, probably won't need it.
export const authorizeGoogleCalendarIntegrationSuccess = createAction(
  '[Calendar Integration] Authorize Google Calendar Integration Success'
);

export const createGoogleCalendarIntegration = createAction(
  '[Calendar Integration] Create Google Calendar Integration',
  props<{ code: string }>()
);

export const createGoogleCalendarIntegrationSuccess = createAction(
  '[Calendar Integration] Create Google Calendar Integration Success',
  props<{ response: ResponseMessage }>()
);
