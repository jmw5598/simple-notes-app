import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { handleHttpError } from '@sn/application/store/actions';
import { ResponseStatus } from '@sn/core/enums';
import { PageableSearch, ResponseMessage } from '@sn/core/models';

import { TodoListsService } from '@sn/core/services/todo-lists.service';
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
        message: `Successfully created flashcard set!`
      } as ResponseMessage;
      return of(fromActions.setCreateTodoListResponseMessage({ message: message }))
    })
  ));

  deleteFlashcardSet$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteTodoList),
    exhaustMap(({todoListId}) => this._todoListsService.delete(todoListId)
      .pipe(
        map(todoList => fromActions.deleteTodoListSuccess({ todoList: todoList })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteFlashcardSetSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteTodoListSuccess),
    switchMap(({todoList}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted toto list!`
      } as ResponseMessage
      return of(fromActions.setDeleteTodoListResponseMessage({ message: message }))
    })
  ));
}