import { createReducer, on } from '@ngrx/store';
import * as fromActions from '../actions';
import { ResponseMessage, Page } from '@sn/core/models';
import { TodoList } from '@sn/shared/models';

export const todosFeatureKey = 'todos';

export interface ITodosState {
  createTodoListResponseMessage: ResponseMessage;
  updateTodoListResponseMessage: ResponseMessage;
  deleteTodoListResponseMessage: ResponseMessage;
  searchTodoListsResult: Page<TodoList>;
  selectedTodoList: TodoList;
}

export const initialTodosState: ITodosState = {
  createTodoListResponseMessage: null,
  updateTodoListResponseMessage: null,
  deleteTodoListResponseMessage: null,
  searchTodoListsResult: null,
  selectedTodoList: null,
}

const onSetCreateTodoListResponse = (state, { message }: any) => ({
  ...state,
  createTodoListResponseMessage: message
} as ITodosState);

const onSetUpdateTodoListResponse = (state, { message }: any) => ({
  ...state,
  updateTodoListResponseMessage: message
} as ITodosState);

const onSetDeleteTodoListResponse = (state, { message }: any) => ({
  ...state,
  deleteTodoListResponseMessage: message
} as ITodosState);

const onSearchTodoListsResult = (state, { page }: any) => ({
  ...state,
  searchTodoListsResult: page
} as ITodosState);

const onSetSelectedTodoList = (state, { todoList }: any) => ({
  ...state,
  selectedTodoList: todoList
});

const _todosReducer = createReducer(
  initialTodosState,
  on(fromActions.setCreateTodoListResponseMessage, onSetCreateTodoListResponse),
  on(fromActions.setUpdateTodoListResponseMessage, onSetUpdateTodoListResponse),
  on(fromActions.setDeleteTodoListResponseMessage, onSetDeleteTodoListResponse),
  on(fromActions.searchTodoListsResult, onSearchTodoListsResult),
  on(fromActions.setSelectedTodoList, onSetSelectedTodoList),
);

export function todosReducer(state, action) {
  return _todosReducer(state, action);
}
