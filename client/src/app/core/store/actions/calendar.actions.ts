import { createAction, props } from '@ngrx/store';
import { CalendarEvent } from '@sn/core/models';

export const createCalendarEvent = createAction(
  '[Calendar Events] Create Calendar Event',
  props<{ event: CalendarEvent }>()
);

export const createCalendarEventSuccess = createAction(
  '[Calendar Events] Create Calendar Event Success',
  props<{ event: CalendarEvent }>()
);

export const updateCalendarEvent = createAction(
  '[Calendar Events] Update Calendar Event',
  props<{ id: number, event: CalendarEvent }>()
);

export const updateCalendarEventSuccess = createAction(
  '[Calendar Events] Update Calendar Event Success',
  props<{ event: CalendarEvent }>()
);

export const deleteCalendarEvent = createAction(
  '[Calendar Events] Delete Calendar Event',
  props<{ id: number }>()
);

export const deleteCalendarEventSuccess = createAction(
  '[Calendar Events] Delete Calendar Event Success',
  props<{ id: number }>()
);

export const getCalendarEventsBetweenDates = createAction(
  '[Calendar Events] Get Calendar Events Between Dates',
  props<{
    startDate: Date,
    endDate: Date
  }>()
);

export const setCurrentCalendarEvents = createAction(
  '[Calendar Events] Set Calendar Events Between Dates',
  props<{ events: CalendarEvent[] }>()
);
