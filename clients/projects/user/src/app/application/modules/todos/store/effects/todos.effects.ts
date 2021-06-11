import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { handleHttpError } from '@sn/user/application/store/actions';
import { ResponseStatus } from '@sn/user/core/enums';
import { PageableSearch, ResponseMessage } from '@sn/user/core/models';

import { TodoListsService } from '@sn/user/core/services/todo-lists.service';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap } from 'rxjs/operators';

import * as fromActions from '../actions';

@Injectable()
export class TodoListsEffects {
  constructor(
    private _actions: Actions,
    private _todoListsService: TodoListsService
  ) {}

  searchTodoLists$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchTodoLists),    
    switchMap(({search}) => {
      const searchs: PageableSearch = search
      return this._todoListsService.searchTodoLists(searchs.searchTerm || '', searchs.pageable)
        .pipe(
          map(result => fromActions.searchTodoListsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));

  createTodoLists$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createTodoList),
    exhaustMap(({ todoList }) => this._todoListsService.save(todoList)
      .pipe(
        map(todoList => fromActions.createTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  createTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createTodoListSuccess),
    switchMap(({ todoList }) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully created todo list!`
      } as ResponseMessage;
      return of(fromActions.setCreateTodoListResponseMessage({ message: message }))
    })
  ));

  updateTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateTodoList),
    exhaustMap(({ todoListId, todoList }) => this._todoListsService.update(todoListId, todoList)
      .pipe(
        map(todoList => fromActions.updateTodoListSuccess({ todoList: todoList })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your todo list, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdateTodoListResponseMessage({ message: message }));
        })
      ))
  ));

  updateTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateTodoListSuccess),
    switchMap(({ todoList }) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated todo list!`
      } as ResponseMessage
      return of(fromActions.setUpdateTodoListResponseMessage({ message: message }))
    })
  ));

  deleteTodoList$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteTodoList),
    exhaustMap(({todoListId}) => this._todoListsService.delete(todoListId)
      .pipe(
        map(todoList => fromActions.deleteTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteTodoListSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteTodoListSuccess),
    switchMap(({todoList}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted todo list!`
      } as ResponseMessage
      return of(fromActions.setDeleteTodoListResponseMessage({ message: message }))
    })
  ));

  getFlashcardSetById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getTodoListById),
    switchMap(({ todoListId }) => this._todoListsService.findOne(todoListId)
      .pipe(
        map(todoList => fromActions.setSelectedTodoList({ todoList: todoList })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));
}