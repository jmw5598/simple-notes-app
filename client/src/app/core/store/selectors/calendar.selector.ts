import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICalendarState } from '../state/calendar.state';

export const selectCalendarState = createFeatureSelector<ICalendarState>("calendar");

export const selectCurrentCalendarEvents = createSelector(
  selectCalendarState,
  (state: ICalendarState) => state.currentCalendarEvents
);

export const selectCreateCalendarEventResponseMessage = createSelector(
  selectCalendarState,
  (state: ICalendarState) => state.createCalendarEventResponseMessage
);

export const selectUpdateCalendarEventResponseMessage = createSelector(
  selectCalendarState,
  (state: ICalendarState) => state.updateCalendarEventResponseMessage
);

export const selectDeleteCalendarEventResponseMessage = createSelector(
  selectCalendarState,
  (state: ICalendarState) => state.deleteCalendarEventResponseMessage
);
