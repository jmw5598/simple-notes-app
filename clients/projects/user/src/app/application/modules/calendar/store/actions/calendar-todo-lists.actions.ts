import { createAction, props } from '@ngrx/store';
import { ResponseMessage } from '@sn/user/core/models';
import { TodoList } from '@sn/user/shared/models';

export const createCalendarTodoList = createAction(
  '[Calendar Todo Lists] Create Calendar Todo List',
  props<{ todoList: TodoList }>()
);

export const createCalendarTodoListSuccess = createAction(
  '[Calendar Todo Lists] Create Calendar Todo List Success',
  props<{ todoList: TodoList }>()
);

export const setCreateCalendarTodoListResponseMessage = createAction(
  '[Calendar Todo Lists] Set Create Calendar Todo List Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateCalendarTodoList = createAction(
  '[Calendar Todo Lists] Update Calendar Todo Lists',
  props<{ id: number, todoList: TodoList }>()
);

export const updateCalendarTodoListSuccess = createAction(
  '[Calendar Todo Lists] Update Calendar Todo Lists Success',
  props<{ todoList: TodoList }>()
);

export const setUpdateCalendarTodoListResponseMessage = createAction(
  '[Calendar Todo Lists] Set Update Calendar Todo Lists Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteCalendarTodoList = createAction(
  '[Calendar Todo Lists] Delete Calendar Todo Lists',
  props<{ id: number }>()
);

export const deleteCalendarTodoListSuccess = createAction(
  '[Calendar Todo Lists] Delete Calendar Todo Lists Success',
  props<{ todoList: TodoList }>()
);

export const setDeleteCalendarTodoListResponseMessage = createAction(
  '[Calendar Todo Lists] Set Delete Calendar Todo Lists Response Message',
  props<{ message: ResponseMessage }>()
);

export const getCalendarTodoListsBetweenDates = createAction(
  '[Calendar Todo Lists] Get Calendar Todo Lists Between Dates',
  props<{
    startDate: Date,
    endDate: Date
  }>()
);

export const setCurrentCalendarTodoLists = createAction(
  '[Calendar Todo Lists] Set Calendar Todo Lists Between Dates',
  props<{ todoLists: TodoList[] }>()
);

export const setSelectedCalendarTodoList = createAction(
  '[Calendar Todo Lists] Set Selected Calendar Todo List',
  props<{ todoList: TodoList }>()
);
