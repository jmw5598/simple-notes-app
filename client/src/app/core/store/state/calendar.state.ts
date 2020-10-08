import { CalendarEvent, ResponseMessage } from '@sn/core/models';

export interface ICalendarState {
  currentCalendarEvents: CalendarEvent[],
  createCalendarEventResponseMessage: ResponseMessage,
  updateCalendarEventResponseMessage: ResponseMessage,
  deleteCalendarEventResponseMessage: ResponseMessage
}

export const initialCalendarState: ICalendarState = {
  currentCalendarEvents: null,
  createCalendarEventResponseMessage: null,
  updateCalendarEventResponseMessage: null,
  deleteCalendarEventResponseMessage: null
}
