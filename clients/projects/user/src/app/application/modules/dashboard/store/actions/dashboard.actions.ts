import { createAction, props } from '@ngrx/store';
import { TodoList, Topic } from '@sn/shared/models';
import { CalendarEvent } from '@sn/shared/models';

export const getRecentTopics = createAction(
  '[Dashboard] Get Recent Topics'
);

export const getRecentTopicsSuccess = createAction(
  '[Dashboard] Get Recent Topics Success',
  props<{ topics: Topic[] }>()
);

export const getTodaysCalendarEvents = createAction(
  '[Dashboard] Get Todays Calendar Events'
);

export const getTodaysCalendarEventsSuccess = createAction(
  '[Dashboard] Get Todays Calendar Events Success',
  props<{ events: CalendarEvent[]}>()
);

export const getTodaysTodoLists = createAction(
  '[Dashboard] Get Todays Todo Lists'
);

export const getTodaysTodoListsSuccess = createAction(
  '[Dashboard] Get Todays Todo Lists Success',
  props<{ todoLists: TodoList[] }>()
);

export const getPastDueTodoLists = createAction(
  '[Dashboard] Get Past Due Todo Lists'
);

export const getPastDueTodoListsSuccess = createAction(
  '[Dashboard] Get Past Due Todo Lists Success',
  props<{ todoLists: TodoList[] }>()
);

export const updateTodaysTodoList = createAction(
  '[Dashboard] Update Todays Todo List',
  props<{ todoListId: number, todoList: TodoList }>()
);

export const updateTodaysTodoListSuccess = createAction(
  '[Dashboard] Update Todays Todo List Success',
  props<{ todoList: TodoList }>()
);

export const updatePastDueTodoList = createAction(
  '[Dashboard] Update Past Due Todo List',
  props<{ todoListId: number, todoList: TodoList }>()
);

export const updatePastDueTodoListSuccess = createAction(
  '[Dashboard] Update Past Due Todo List Success',
  props<{ todoList: TodoList }>()
);
