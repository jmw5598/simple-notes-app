import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { CalendarEvent, ResponseMessage } from '@sn/core/models';

export const calendarEventsFeatureKey = 'calendarEvents';

export interface ICalendarEventsState {
  currentCalendarEvents: CalendarEvent[],
  createCalendarEventResponseMessage: ResponseMessage,
  updateCalendarEventResponseMessage: ResponseMessage,
  deleteCalendarEventResponseMessage: ResponseMessage,
  currentCalendarDateRanges: {[key: string]: Date};
}

export const initialCalendarEventState: ICalendarEventsState = {
  currentCalendarEvents: null,
  createCalendarEventResponseMessage: null,
  updateCalendarEventResponseMessage: null,
  deleteCalendarEventResponseMessage: null,
  currentCalendarDateRanges: null
}

const _calendarEventReducer = createReducer(
  initialCalendarEventState,
  on(fromActions.setCurrentCalendarEvents, (state, { events }) => {
    return {
      ...state,
      currentCalendarEvents: events
    }
  }),
  on(fromActions.createCalendarEventSuccess, (state, { event }) => {
    return {
      ...state,
      currentCalendarEvents: !state.createCalendarEventResponseMessage ? null : [
        ...state.currentCalendarEvents || [],
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

export function calendarEventReducer(state, action) {
  return _calendarEventReducer(state, action);
}
