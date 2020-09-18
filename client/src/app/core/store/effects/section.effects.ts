import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { SectionsService } from '../../services/sections.service';
import { handleHttpError } from '../actions/http-error.actions';
import { SectionActions, createSectionSuccess, deleteSectionSuccess, setSelectedSection } from '../actions/section.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class SectionEffects {
  constructor(
    private _actions: Actions,
    private _sectionsService: SectionsService
  ) {}

  createSection$ = createEffect(() => this._actions.pipe(
    ofType(SectionActions.CREATE_SECTION),
    mergeMap(({topicId, section}) => this._sectionsService.save(topicId, section)
      .pipe(
        map(result => createSectionSuccess({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  // deleteSection$ = createEffect(() => this._actions.pipe(
  //   ofType(SectionActions.DELETE_SECTION),
  //   mergeMap(({id}) => this._topicsService.delete(id)
  //     .pipe(
  //       map(result => deleteSectionSuccess({ topic: result })),
  //       catchError(error => of(handleHttpError(error)))
  //     )
  //   )
  // ));

  // getSectionById$ = createEffect(() => this._actions.pipe(
  //   ofType(SectionActions.GET_SECTION_BY_ID),
  //   mergeMap(({id}) => this._topicsService.findOne(id)
  //     .pipe(
  //       map(result => setSelectedSection({ topic: result })),
  //       catchError(error => of(handleHttpError(error)))
  //     )
  //   )
  // ));
}