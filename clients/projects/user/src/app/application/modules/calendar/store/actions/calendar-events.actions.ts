import { createAction, props } from '@ngrx/store';
import { CalendarEvent, ResponseMessage } from '@sn/user/core/models';

export const createCalendarEvent = createAction(
  '[Calendar Events] Create Calendar Event',
  props<{ event: CalendarEvent }>()
);

export const createCalendarEventSuccess = createAction(
  '[Calendar Events] Create Calendar Event Success',
  props<{ event: CalendarEvent }>()
);

export const setCreateCalendarEventResponseMessage = createAction(
  '[Calendar Events] Set Create Calendar Event Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateCalendarEvent = createAction(
  '[Calendar Events] Update Calendar Event',
  props<{ id: number, event: CalendarEvent }>()
);

export const updateCalendarEventSuccess = createAction(
  '[Calendar Events] Update Calendar Event Success',
  props<{ event: CalendarEvent }>()
);

export const setUpdateCalendarEventResponseMessage = createAction(
  '[Calendar Events] Set Update Calendar Event Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteCalendarEvent = createAction(
  '[Calendar Events] Delete Calendar Event',
  props<{ id: number }>()
);

export const deleteCalendarEventSuccess = createAction(
  '[Calendar Events] Delete Calendar Event Success',
  props<{ event: CalendarEvent }>()
);

export const setDeleteCalendarEventResponseMessage = createAction(
  '[Calendar Events] Set Delete Calendar Event Response Message',
  props<{ message: ResponseMessage }>()
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

export const setCurrentCalendarDateRanges = createAction(
  '[Calendar Events] Set Current Calendar Date Ranges',
  props<{ 
    startDate: Date, 
    endDate: Date 
  }>()
);

export const setSelectedCalendarEvent = createAction(
  '[Calendar Events] Set Selected Calendar Event',
  props<{ event: CalendarEvent }>()
);
