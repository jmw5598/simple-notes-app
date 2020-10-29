import { createReducer, on } from '@ngrx/store';
import { Page, ResponseMessage } from '@sn/core/models';
import { Topic, FileResponse } from '@sn/shared/models';
import * as fromActions from '../actions';

export const topicsFeatureKey = 'topics';

export interface ITopicsState {
  topics: Topic[],
  selectedTopic: Topic,
  createTopicResponseMessage: ResponseMessage,
  updateTopicResponseMessage: ResponseMessage,
  exportTopicResponseMessage: ResponseMessage,
  exportTopicFileResponse: FileResponse,
  searchTopicsResult: Page<Topic>,
  searchTopicsFromDrawerResult: Page<Topic>

};

export const initialTopicState: ITopicsState = {
  topics: null,
  selectedTopic: null,
  createTopicResponseMessage: null,
  updateTopicResponseMessage: null,
  exportTopicResponseMessage: null,
  exportTopicFileResponse: null,
  searchTopicsResult: null,
  searchTopicsFromDrawerResult: null
};

export const topicReducer = createReducer(
  initialTopicState,
  on(fromActions.getAllTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      topics: topics
    }
  }),
  on(fromActions.deleteTopicSuccess, (state, { topic }) => {
    const page: Page<Topic> = { ...state.searchTopicsResult } as Page<Topic>;
    page.elements = page.elements.filter(t => t.id !== topic.id)
    return {
      ...state,
      searchTopicsResult: page
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
  }),
  on(fromActions.searchTopicsFromDrawerResult, (state, { page }) => {
    return {
      ...state,
      searchTopicsFromDrawerResult: page
    }
  })
);

// export function topicReducer(state, action) {
//   return _topicReducer(state, action);
// }
