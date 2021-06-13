import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage } from '@sn/shared/models';
import { TodoList } from '@sn/shared/models';

export const createTodoList = createAction(
  '[Todo Lists] Create Todo List',
  props<{ todoList: TodoList }>()
);

export const createTodoListSuccess = createAction(
  '[Todo Lists] Create Todo List Success',
  props<{ todoList: TodoList }>()
);

export const setCreateTodoListResponseMessage = createAction(
  '[Todo Lists] Set Create Todo List Response Message',
  props<{ message: ResponseMessage }>()
);

export const deleteTodoList = createAction(
  '[Todo Lists] Delete Todo List',
  props<{ todoListId: number }>()
);

export const deleteTodoListSuccess = createAction(
  '[Todo Lists] Delete Todo List Success',
  props<{ todoList: TodoList }>()
);

export const setDeleteTodoListResponseMessage = createAction(
  '[Todo Lists] Set Delete Todo List Response Message',
  props<{ message: ResponseMessage }>()
);

export const updateTodoList = createAction(
  '[Todo Lists] Update Todo List',
  props<{ todoListId: number, todoList: TodoList }>()
);

export const updateTodoListSuccess = createAction(
  '[Todo Lists] Update Todo List Success',
  props<{ todoList: TodoList }>()
);

export const setUpdateTodoListResponseMessage = createAction(
  '[Todo Lists] Set Update Todo List Response Message',
  props<{ message: ResponseMessage }>()
);

export const searchTodoLists = createAction(
  '[Todo Lists] Search Todo Lists',
  props<{ search: PageableSearch }>()
);

export const searchTodoListsResult = createAction(
  '[Todo Lists] Search Todo Lists Result',
  props<{ page: Page<TodoList> }>()
);

export const getTodoListById = createAction(
  '[Todo List] Get Todo List By Id',
  props<{ todoListId: number }>()
);

export const getTodoListByIdSuccess = createAction(
  '[Todo Lists] Get Todo List By Id',
  props<{ todoList: TodoList }>()
);

export const setSelectedTodoList = createAction(
  '[Todo Lists] Set Selected Todo List',
  props<{ todoList: TodoList }>()
);
