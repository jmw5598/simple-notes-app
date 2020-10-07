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
  })
);

export function calendarReducer(state, action) {
  return _calendarReducer(state, action);
}
