import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { TopicsService } from '../../services/topics.service';
import { handleHttpError } from '../actions/http-error.actions';
import { TopicActions, getAllTopicsSuccess, createTopicSuccess, deleteTopicSuccess } from '../actions/topic.actions';

import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';

@Injectable()
export class TopicEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService
  ) {}

  getAllTopics$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.GET_ALL_TOPICS),
    mergeMap(() => this._topicsService.findAll()
      .pipe(
        map(topics => getAllTopicsSuccess({ topics: topics })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createTopic$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.CREATE_TOPIC),
    mergeMap(({topic}) => this._topicsService.save(topic)
      .pipe(
        map(result => createTopicSuccess({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  deleteTopic$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.DELETE_TOPIC),
    mergeMap(({id}) => this._topicsService.delete(id)
      .pipe(
        map(result => deleteTopicSuccess({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));
}
