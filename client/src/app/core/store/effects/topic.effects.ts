import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { TopicsService } from '../../services/topics.service';
import { SectionsService } from '../../services/sections.service';
import { handleHttpError } from '../actions/http-error.actions';
import { of } from 'rxjs';
import { map, mergeMap, catchError } from 'rxjs/operators';
import { ResponseMessage } from '@sn/core/models';
import { ResponseStatus } from '@sn/core/enums';

import { 
  TopicActions, 
  getAllTopicsSuccess, 
  createTopicSuccess, 
  deleteTopicSuccess, 
  setSelectedTopic,
  createSectionSuccess,
  deleteSectionSuccess, 
  setCreateTopicResponseMessage,
  setCreateSectionResponseMessage,
  setSelectedSection,
  setUpdateSectionNotesResponseMessage,
  setExportTopicResponseMessage,
  exportTopicSuccess, 
  updateTopicSuccess, 
  setUpdateTopicResponseMessage,
  updateSectionSuccess,
  setUpdateSectionResponseMessage } from '../actions/topic.actions';

@Injectable()
export class TopicEffects {
  constructor(
    private _actions: Actions,
    private _topicsService: TopicsService,
    private _sectionsService: SectionsService
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

  createTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.CREATE_TOPIC_SUCCESS),
    mergeMap(({topic}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new topic!`
      } as ResponseMessage
      return of(setCreateTopicResponseMessage({ message: message }))
    })
  ));

  updateTopic$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.UPDATE_TOPIC),
    mergeMap(({id, topic}) => this._topicsService.update(id, topic)
      .pipe(
        map(result => updateTopicSuccess({ topic: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your topic, please try again!`
          } as ResponseMessage;
          return of(setUpdateTopicResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.UPDATE_TOPIC_SUCCESS),
    mergeMap(({topic}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated topic!`
      } as ResponseMessage
      return of(setUpdateTopicResponseMessage({ message: message }))
    })
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

  getTopicById$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.GET_TOPIC_BY_ID),
    mergeMap(({id}) => this._topicsService.findOne(id)
      .pipe(
        map(result => setSelectedTopic({ topic: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createSection$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.CREATE_SECTION),
    mergeMap(({topicId, section}) => this._sectionsService.save(topicId, section)
      .pipe(
        map(result => createSectionSuccess({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  createSectionSuccess$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.CREATE_SECTION_SUCCESS),
    mergeMap(({section}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully create new section!`
      } as ResponseMessage
      return of(setCreateSectionResponseMessage({ message: message }))
    })
  ));

  updateSection$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.UPDATE_SECTION),
    mergeMap(({topicId, sectionId, section}) => this._sectionsService.update(topicId, sectionId, section)
      .pipe(
        map(result => updateSectionSuccess({ section: result })),
        catchError(error => {
          const message: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error updating your section, please try again!`
          } as ResponseMessage;
          return of(setUpdateSectionResponseMessage({ message: message }));
        })
      )
    )
  ));

  updateSectionSuccess$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.UPDATE_SECTION_SUCCESS),
    mergeMap(({topic}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `Successfully updated section!`
      } as ResponseMessage
      return of(setUpdateSectionResponseMessage({ message: message }))
    })
  ));

  deleteSection$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.DELETE_SECTION),
    mergeMap(({topicId, sectionId}) => this._sectionsService.delete(topicId, sectionId)
      .pipe(
        map(result => deleteSectionSuccess({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  getSectionById$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.GET_SECTION_BY_ID),
    mergeMap(({topicId, sectionId}) => this._sectionsService.findOne(topicId, sectionId)
      .pipe(
        map(result => setSelectedSection({ section: result })),
        catchError(error => of(handleHttpError(error)))
      )
    )
  ));

  updateSectionNotes$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.UPDATE_SECTION_NOTES),
    mergeMap(({ topicId, sectionId, notes }) => this._sectionsService.updateNotes(topicId, sectionId, notes)
      .pipe(
        map(result => {
          const successMessage: ResponseMessage = {
            status: ResponseStatus.SUCCESS,
            message: `Successfully save your notes!`
          }
          return setUpdateSectionNotesResponseMessage({ message: successMessage })
        }),
        catchError(error => {
          const errorMessage: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `Error updating your notes, please try again`
          }
          return of(setUpdateSectionNotesResponseMessage({ message: errorMessage }));
        })
      )
    )
  ));

  exportTopic$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.EXPORT_TOPIC),
    mergeMap(({topicId, config}) => this._topicsService.exportTopic(topicId, config)
      .pipe(
        map(result => exportTopicSuccess({ file: result })),
        catchError(error => {
          const errorMessage: ResponseMessage = {
            status: ResponseStatus.ERROR,
            message: `We encountered an error exporting your topic!`
          } as ResponseMessage
          return of(setExportTopicResponseMessage({ message: errorMessage }))
        })
      )
    )
  )); 

  exportTopicSuccess$ = createEffect(() => this._actions.pipe(
    ofType(TopicActions.EXPORT_TOPIC_SUCCESS),
    mergeMap(({file}) => {
      const message: ResponseMessage = {
        status: ResponseStatus.SUCCESS,
        message: `We successfully export your topic!`
      } as ResponseMessage
      return of(setExportTopicResponseMessage({ message: message }))
    })
  ));
}
