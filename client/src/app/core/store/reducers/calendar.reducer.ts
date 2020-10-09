import { createReducer, on } from '@ngrx/store';
import { initialCalendarState } from '../state/calendar.state';
import * as fromActions from '../actions';

const _calendarReducer = createReducer(
  initialCalendarState,
  on(fromActions.setCurrentCalendarEvents, (state, { events }) => {
    return {
      ...state,
      currentCalendarEvents: events
    }
  }),
  on(fromActions.createCalendarEventSuccess, (state, { event }) => {
    return {
      ...state,
      currentCalendarEvents: [
        ...state.currentCalendarEvents,
        event
      ]
    }
  }),
  on(fromActions.deleteCalendarEventSuccess, (state, { event }) => {
    return {
      ...state,
      currentCalendarEvents: state.currentCalendarEvents
        .filter(e => e.id !== event.id)
    }
  }),
  on(fromActions.updateCalendarEventSuccess, (state, { event }) => {
    return {
      ...state,
      currentCalendarEvents: [
        ...state.currentCalendarEvents.filter(e => e.id !== event.id),
        event
      ]
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
  on(fromActions.setCurrentCalendarDateRanges, (state, { startDate, endDate }) => {
    return {
      ...state,
      currentCalendarDateRanges: {
        startDate: startDate,
        endDate: endDate
      }
    }
  })
);

export function calendarReducer(state, action) {
  return _calendarReducer(state, action);
}
