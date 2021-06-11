import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { CalendarEvent, ResponseMessage } from '@sn/user/core/models';
import { TodoList } from '@sn/user/shared/models';

export const calendarEventsFeatureKey = 'calendarEvents';

export interface ICalendarEventsState {
  currentCalendarEvents: CalendarEvent[],
  selectedCalendarEvent: CalendarEvent,
  createCalendarEventResponseMessage: ResponseMessage,
  updateCalendarEventResponseMessage: ResponseMessage,
  deleteCalendarEventResponseMessage: ResponseMessage,
  currentCalendarDateRanges: {[key: string]: Date},

  currentCalendarTodoLists: TodoList[],
  selectedCalendarTodoList: TodoList,
  createCalendarTodoListResponseMessage: ResponseMessage,
  updateCalendarTodoListResponseMessage: ResponseMessage,
  deleteCalendarTodoListResponseMessage: ResponseMessage,
}

export const initialCalendarEventState: ICalendarEventsState = {
  currentCalendarEvents: null,
  selectedCalendarEvent: null,
  createCalendarEventResponseMessage: null,
  updateCalendarEventResponseMessage: null,
  deleteCalendarEventResponseMessage: null,
  currentCalendarDateRanges: null,
  currentCalendarTodoLists: null,
  selectedCalendarTodoList: null,
  createCalendarTodoListResponseMessage: null,
  updateCalendarTodoListResponseMessage: null,
  deleteCalendarTodoListResponseMessage: null
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
      ],
      selectedCalendarEvent: event
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
  }),
  on(fromActions.setCurrentCalendarTodoLists, (state, { todoLists }) => {
    return {
      ...state,
      currentCalendarTodoLists: todoLists
    }
  }),
  on(fromActions.setSelectedCalendarTodoList, (state, { todoList }) => {
    return {
      ...state,
      selectedCalendarTodoList: todoList
    }
  }),
  on(fromActions.setCreateCalendarTodoListResponseMessage, (state, { message }) => {
    return {
      ...state,
      createCalendarTodoListResponseMessage: message
    }
  }),
  on(fromActions.setUpdateCalendarTodoListResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateCalendarTodoListResponseMessage: message
    }
  }),
  on(fromActions.setDeleteCalendarTodoListResponseMessage, (state, { message }) => {
    return {
      ...state,
      deleteCalendarTodoListResponseMessage: message
    }
  }),
  on(fromActions.deleteCalendarTodoListSuccess, (state, { todoList }) => {
    return {
      ...state,
      currentCalendarTodoLists: state.currentCalendarTodoLists
        .filter(e => e.id !== todoList.id)
    }
  }),
  on(fromActions.updateCalendarTodoListSuccess, (state, { todoList }) => {
    return {
      ...state,
      currentCalendarTodoLists: [
        ...state.currentCalendarTodoLists.filter(e => e.id !== todoList.id),
        todoList
      ],
      selectedCalendarTodoList: todoList
    }
  }),
);

export function calendarEventReducer(state, action) {
  return _calendarEventReducer(state, action);
}
