import { createReducer, on } from '@ngrx/store';
import { initialCalendarState } from '../state/calendar.state';
import { CalendarEvent } from '@sn/core/models';
import * as fromActions from '../actions';

const _calendarReducer = createReducer(
  initialCalendarState,
  on(fromActions.setCurrentCalendarEvents, (state, { events }) => {
    return {
      ...state,
      currentCalendarEvents: events
    }
  }),
  on(fromActions.setCreateCalendarEventResponseMessage, (state, { message }) => {
    return {
      ...state,
      createCalendarEventResponseMessage: message
    }
  }),
  on(fromActions.setUpdateCalendarEventResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateCalendarEventResponseMessage: message
    }
  }),
  on(fromActions.setDeleteCalendarEventResponseMessage, (state, { message }) => {
    return {
      ...state,
      deleteCalendarEventResponseMessage: message
    }
  }),
);

export function calendarReducer(state, action) {
  return _calendarReducer(state, action);
}
