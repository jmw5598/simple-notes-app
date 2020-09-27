import { createReducer, on } from '@ngrx/store';
import { initialTopicState } from '../state/topic.state';
import { Topic, Section } from '@sn/shared/models';
import * as fromActions from '../actions';

const _topicReducer = createReducer(
  initialTopicState,
  on(fromActions.getAllTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      topics: topics
    }
  }),
  on(fromActions.deleteTopicSuccess, (state, { topic }) => {
    const topics: Topic[] = state.topics.filter(t => t.id !== topic.id);
    return {
      ...state,
      topics: topics
    }
  }),
  on(fromActions.updateTopicSuccess, (state, { topic }) => {
    const updatedTopic: Topic = { ...state.selectedTopic, ...topic };
    return {
      ...state,
      selectedTopic: updatedTopic
    }
  }),
  on(fromActions.setSelectedTopic, (state, { topic }) => {
    return {
      ...state,
      selectedTopic: topic
    }
  }),
  on(fromActions.setCreateTopicResponseMessage, (state, { message }) => {
    return {
      ...state,
      createTopicResponseMessage: message
    }
  }),
  on(fromActions.setUpdateTopicResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateTopicResponseMessage: message
    }
  }),
  on(fromActions.exportTopicSuccess, (state, { file }) => {
    return {
      ...state,
      exportTopicFileResponse: file
    }
  }),
  on(fromActions.setExportTopicResponseMessage, (state, { message }) => {
    return {
      ...state,
      exportTopicResponseMessage: message
    }
  }),
  on(fromActions.setExportTopicFileResponse, (state, { file }) => {
    return {
      ...state,
      exportTopicFileResponse: file
    }
  }),
  on(fromActions.searchTopicsResult, (state, { page }) => {
    return {
      ...state,
      searchTopicsResult: page
    }
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}
