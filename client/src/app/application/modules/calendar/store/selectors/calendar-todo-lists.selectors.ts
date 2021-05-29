import { createSelector } from '@ngrx/store';
import * as fromCalendarEvents from '../reducers/calendar-events.reducers';
import * as fromApplication from '../../../../store/index';

const selectCalendarEventState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.calendarEvents
);

export const selectCurrentCalendarTodoLists = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.currentCalendarTodoLists
);

export const selectCreateCalendarTodoListResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.createCalendarTodoListResponseMessage
);

export const selectUpdateCalendarTodoListResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.updateCalendarTodoListResponseMessage
);

export const selectDeleteCalendarTodoListResponseMessage = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.deleteCalendarTodoListResponseMessage
);

export const selectSelectedCalendarTodoList = createSelector(
  selectCalendarEventState,
  (state: fromCalendarEvents.ICalendarEventsState) => state.selectedCalendarTodoList
);
