import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { FlashcardsService } from '@sn/core/services';
import { PageableSearch } from '@sn/core/models';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import * as fromActions from '../actions';
import { handleHttpError } from '../../../../store/actions';

@Injectable()
export class FlashcardsEffects {
  constructor(
    private _actions: Actions,
    private _flashcardsService: FlashcardsService
  ) {}

  searchFlashcardSets$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchFlashcardSets),    
    switchMap(({search}) => {
      const searchs: PageableSearch = search
      console.log("serachign flash cards sets effect", search, searchs);
      return this._flashcardsService.searchFlashcardSets(searchs.searchTerm, searchs.pageable)
        .pipe(
          map(result => fromActions.searchFlashcardSetsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));
}
