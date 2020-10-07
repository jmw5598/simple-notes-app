import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICalendarState } from '../state/calendar.state';

export const selectCalendarState = createFeatureSelector<ICalendarState>("calendar");

export const selectCurrentCalendarEvents = createSelector(
  selectCalendarState,
  (state: ICalendarState) => state.currentCalendarEvents
);
