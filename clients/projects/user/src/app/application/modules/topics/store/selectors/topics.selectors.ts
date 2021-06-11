import { createSelector } from '@ngrx/store';
import * as fromTopics from '../reducers/topics.reducers';
import * as fromApplication from '../../../../store/index';

export const selectTopicState = createSelector(
  fromApplication.selectApplicationState,
  (state: fromApplication.IApplicationState) => state.topics
);

export const selectTopics = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.topics
);

export const selectSelectedTopic = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.selectedTopic
);

export const selectCreateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.createTopicResponseMessage
);

export const selectUpdateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.updateTopicResponseMessage
);

export const selectExportTopicResponseMessage = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.exportTopicResponseMessage
);

export const selectExportTopicFile = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.exportTopicFileResponse
);

export const selectSearchTopicsResult = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.searchTopicsResult
);

export const selectSearchTopicsFromDrawerResult = createSelector(
  selectTopicState,
  (state: fromTopics.ITopicsState) => state.searchTopicsFromDrawerResult
);
