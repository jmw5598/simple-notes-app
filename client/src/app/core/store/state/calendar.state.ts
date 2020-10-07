import { CalendarEvent } from '@sn/core/models';

export interface ICalendarState {
  currentCalendarEvents: CalendarEvent[];
}

export const initialCalendarState: ICalendarState = {
  currentCalendarEvents: null
}
