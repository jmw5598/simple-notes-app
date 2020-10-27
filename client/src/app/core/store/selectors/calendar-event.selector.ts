import { createSelector, createFeatureSelector } from '@ngrx/store';
import { createCalendarEvent } from '../actions';
import { ICalendarEventState } from '../state/calendar-event.state';

export const selectCalendarEventState = createFeatureSelector<ICalendarEventState>("calendarEvents");

export const selectCurrentCalendarEvents = createSelector(
  selectCalendarEventState,
  (state: ICalendarEventState) => state.currentCalendarEvents
);

export const selectCreateCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: ICalendarEventState) => state.createCalendarEventResponseMessage
);

export const selectUpdateCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: ICalendarEventState) => state.updateCalendarEventResponseMessage
);

export const selectDeleteCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: ICalendarEventState) => state.deleteCalendarEventResponseMessage
);

export const selectCurrentCalendarDateRanges = createSelector(
  selectCalendarEventState,
  (state: ICalendarEventState) => state.currentCalendarDateRanges
);
