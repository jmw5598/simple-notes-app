import { createSelector } from '@ngrx/store';
import * as fromCalendarEvents from '../reducers/calendar-events.reducers';
import * as fromApplication from '../../../../store/index';

export const selectCalendarEventState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.calendarEvents
);

export const selectCurrentCalendarEvents = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.currentCalendarEvents
);

export const selectCreateCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.createCalendarEventResponseMessage
);

export const selectUpdateCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.updateCalendarEventResponseMessage
);

export const selectDeleteCalendarEventResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.deleteCalendarEventResponseMessage
);

export const selectCurrentCalendarDateRanges = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.currentCalendarDateRanges
);

export const selectSelectedCalendarEvent = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.selectedCalendarEvent
);
