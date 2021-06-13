import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { SectionsService } from '@sn/core/services';
import { handleHttpError } from '@sn/user/application/store/actions/http-error.actions';
import { of } from 'rxjs';
import { exhaustMap, switchMap, map, catchError, debounceTime } from 'rxjs/operators';
import { PageableSearch, ResponseMessage, ResponseStatus } from '@sn/shared/models';
import * as fromActions from '../actions';

@Injectable()
export class SectionsEffects {
  constructor(
    private _actions: Actions,
    private _sectionsService: SectionsService
  ) {}

  createSection$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createSection),
    exhaustMap(({topicId, section}) => this._sectionsService.save(topicId, section)
      .pipe(
        map(result => fromActions.createSectionSuccess({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createSectionSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createSectionSuccess),
    switchMap(({section}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new section!`
      } as ResponseMessage
      return of(fromActions.setCreateSectionResponseMessage({ message: message }))
    })
  ));

  updateSection$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateSection),
    switchMap(({topicId, sectionId, section}) => this._sectionsService.update(topicId, sectionId, section)
      .pipe(
        map(result => fromActions.updateSectionSuccess({ section: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your section, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdateSectionResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateSectionSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateSectionSuccess),
    switchMap(() => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated section!`
      } as ResponseMessage
      return of(fromActions.setUpdateSectionResponseMessage({ message: message }))
    })
  ));

  deleteSection$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteSection),
    exhaustMap(({topicId, sectionId}) => this._sectionsService.delete(topicId, sectionId)
      .pipe(
        map(result => fromActions.deleteSectionSuccess({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getSectionById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getSectionById),
    switchMap(({topicId, sectionId}) => this._sectionsService.findOne(topicId, sectionId)
      .pipe(
        map(result => fromActions.setSelectedSection({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateSectionNotes$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateSectionNotes),
    switchMap(({ topicId, sectionId, notes }) => this._sectionsService.updateNotes(topicId, sectionId, notes)
      .pipe(
        map(result => {
          const successMessage: ResponseMessage = {
            status: ResponseStatus.SUCCESS,
            message: `Successfully save your notes!`
          }
          return fromActions.setUpdateSectionNotesResponseMessage({ message: successMessage })
        }),
        catchError(error => {
          const errorMessage: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `Error updating your notes, please try again`
          }
          return of(fromActions.setUpdateSectionNotesResponseMessage({ message: errorMessage }));
        })
      )
    )
  ));

  searchSections$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchSections),
    switchMap(({topicId, search}) => {
      const searchs: PageableSearch = search;
      return this._sectionsService.searchSections(topicId, searchs.searchTerm, searchs.pageable)
        .pipe(
          map(result => fromActions.searchSectionsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));
}