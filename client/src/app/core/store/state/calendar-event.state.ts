import { CalendarEvent, ResponseMessage } from '@sn/core/models';

export interface ICalendarEventState {
  currentCalendarEvents: CalendarEvent[],
  createCalendarEventResponseMessage: ResponseMessage,
  updateCalendarEventResponseMessage: ResponseMessage,
  deleteCalendarEventResponseMessage: ResponseMessage,
  currentCalendarDateRanges: {[key: string]: Date};
}

export const initialCalendarEventState: ICalendarEventState = {
  currentCalendarEvents: null,
  createCalendarEventResponseMessage: null,
  updateCalendarEventResponseMessage: null,
  deleteCalendarEventResponseMessage: null,
  currentCalendarDateRanges: null
}
