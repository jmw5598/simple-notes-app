import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FlashcardsService } from '@sn/core/services';
import { PageableSearch, ResponseMessage } from '@sn/core/models';
import { of } from 'rxjs';
import { catchError, exhaustMap, map, switchMap, tap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { handleHttpError } from '../../../../store/actions';
import { ResponseStatus } from '@sn/core/enums';

@Injectable()
export class FlashcardsEffects {
  constructor(
    private _actions: Actions,
    private _flashcardsService: FlashcardsService
  ) {}

  getFlashcardSetById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getFlashcardSetById),
    switchMap(({ flashcardSetId }) => this._flashcardsService.findOne(flashcardSetId)
      .pipe(
        map(flashcardSet => fromActions.setSelectedFlashcardSet({ flashcardSet: flashcardSet })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  getFlashcardSetForBuilderSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.setSelectedFlashcardSet),
    switchMap(({ flashcardSet }) => of(fromActions.setFlashcardSetBuilder({ flashcardSetBuilder: flashcardSet })))
  ));

  createFlashcardSet$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createFlashcardSet),
    exhaustMap(({ flashcardSet }) => this._flashcardsService.save(flashcardSet)
      .pipe(
        map(flashcardSet => fromActions.createFlashcardSetSuccess({ flashcardSet: flashcardSet })),
        catchError(error => of(handleHttpError({ error: error })))
      )
    )
  ));

  updateFlashcardSet$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateFlashcardSet),
    exhaustMap(({ flashcardSetId, flashcardSet }) => this._flashcardsService.update(flashcardSetId, flashcardSet)
      .pipe(
        map(flashcardSet => fromActions.updateFlashcardSetSuccess({ flashcardSet: flashcardSet })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your flashcard set, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdateFlashcardSetResponseMessage({ message: message }));
        })
      ))
  ));

  updateFlashcardSetSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateFlashcardSetSuccess),
    switchMap(({ flashcardSet }) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated flashcard set!`
      } as ResponseMessage
      return of(fromActions.setUpdateFlashcardSetResponseMessage({ message: message }))
    })
  ));

  deleteFlashcardSet$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteFlashcardSet),
    exhaustMap(({flashcardSetId}) => this._flashcardsService.delete(flashcardSetId)
      .pipe(
        map(flashcardSet => fromActions.deleteFlashcardSetSuccess({ flashcardSet: flashcardSet })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteFlashcardSetSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteFlashcardSetSuccess),
    switchMap(({flashcardSet}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully deleted flashcard set!`
      } as ResponseMessage
      return of(fromActions.setDeleteFlashcardSetResponseMessage({ message: message }))
    })
  ));

  createFlashcardSetSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createFlashcardSetSuccess),
    switchMap(({ flashcardSet }) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully created flashcard set!`
      } as ResponseMessage;
      return of(fromActions.setCreateFlashcardSettResponseMessage({ message: message }))
    })
  ));

  searchFlashcardSets$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchFlashcardSets),    
    switchMap(({search}) => {

      const searchs: PageableSearch = search
      // console.log("serachign flash cards sets effect", search, searchs);
      return this._flashcardsService.searchFlashcardSets(searchs.searchTerm || '', searchs.pageable)
        .pipe(
          map(result => fromActions.searchFlashcardSetsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));
}
