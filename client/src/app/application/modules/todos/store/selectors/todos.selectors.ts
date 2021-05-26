import { createSelector } from '@ngrx/store';
import * as fromTodos from '../reducers/todos.reducer';
import * as fromApplication from '../../../../store/index';

export const selectTodosState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.todos
);

export const selectSearchTodoListsResult = createSelector(
  selectTodosState,
  (state: fromTodos.ITodosState) => state.searchTodoListsResult
);

export const selectCreateTodoListResponseMessage = createSelector(
  selectTodosState,
  (state: fromTodos.ITodosState) => state.createTodoListResponseMessage
);

export const selectUpdateTodoListResponseMessage = createSelector(
  selectTodosState,
  (state: fromTodos.ITodosState) => state.updateTodoListResponseMessage
);

export const selectDeleteTodoListResponseMessage = createSelector(
  selectTodosState,
  (state: fromTodos.ITodosState) => state.deleteTodoListResponseMessage
);

export const selectSelectedTodoList = createSelector(
  selectTodosState,
  (state: fromTodos.ITodosState) => state.selectedTodoList
);
