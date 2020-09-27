import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TopicsService } from '../../services/topics.service';
import { SectionsService } from '../../services/sections.service';
import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { switchMap, map, mergeMap, catchError } from 'rxjs/operators';
import { PageableSearch, ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';
import * as fromActions from '../actions';

@Injectable()
export class TopicEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService,
    private _sectionsService: SectionsService
  ) {}

  getAllTopics$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getAllTopics),
    mergeMap(() => this._topicsService.findAll()
      .pipe(
        map(topics => fromActions.getAllTopicsSuccess({ topics: topics })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createTopic$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createTopic),
    mergeMap(({topic}) => this._topicsService.save(topic)
      .pipe(
        map(result => fromActions.createTopicSuccess({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.createTopicSuccess),
    mergeMap(({topic}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new topic!`
      } as ResponseMessage
      return of(fromActions.setCreateTopicResponseMessage({ message: message }))
    })
  ));

  updateTopic$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateTopic),
    mergeMap(({id, topic}) => this._topicsService.update(id, topic)
      .pipe(
        map(result => fromActions.updateTopicSuccess({ topic: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your topic, please try again!`
          } as ResponseMessage;
          return of(fromActions.setUpdateTopicResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.updateTopicSuccess),
    mergeMap(({topic}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated topic!`
      } as ResponseMessage
      return of(fromActions.setUpdateTopicResponseMessage({ message: message }))
    })
  ));

  deleteTopic$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.deleteTopic),
    mergeMap(({id}) => this._topicsService.delete(id)
      .pipe(
        map(result => fromActions.deleteTopicSuccess({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getTopicById$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.getTopicById),
    mergeMap(({id}) => this._topicsService.findOne(id)
      .pipe(
        map(result => fromActions.setSelectedTopic({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  exportTopic$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.exportTopic),
    mergeMap(({topicId, config}) => this._topicsService.exportTopic(topicId, config)
      .pipe(
        map(result => fromActions.exportTopicSuccess({ file: result })),
        catchError(error => {
          const errorMessage: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error exporting your topic!`
          } as ResponseMessage
          return of(fromActions.setExportTopicResponseMessage({ message: errorMessage }))
        })
      )
    )
  )); 

  exportTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.exportTopicSuccess),
    mergeMap(({file}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `We successfully export your topic!`
      } as ResponseMessage
      return of(fromActions.setExportTopicResponseMessage({ message: message }))
    })
  ));

  searchTopics$ = createEffect(() => this._actions.pipe(
    ofType(fromActions.searchTopics),
    switchMap(({search}) => {
      const searchs: PageableSearch = search
      return this._topicsService.searchTopics(searchs.searchTerm, searchs.pageable)
        .pipe(
          map(result => fromActions.searchTopicsResult({ page: result })),
          catchError(error => of(handleHttpError(error)))
        )
      }
    )
  ));
}
