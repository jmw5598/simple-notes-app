import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITopicState } from '../state/topic.state';

export const selectTopicState = createFeatureSelector<ITopicState>('topics');

export const selectTopics = createSelector(
  selectTopicState,
  (state: ITopicState) => state.topics
);

export const selectSelectedTopic = createSelector(
  selectTopicState,
  (state: ITopicState) => state.selectedTopic
);

export const selectCreateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.createTopicResponseMessage
);

export const selectUpdateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.updateTopicResponseMessage
);

export const selectExportTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.exportTopicResponseMessage
);

export const selectExportTopicFile = createSelector(
  selectTopicState,
  (state: ITopicState) => state.exportTopicFileResponse
);

export const selectSearchTopicsResult = createSelector(
  selectTopicState,
  (state: ITopicState) => state.searchTopicsResult
);

export const selectSearchTopicsFromDrawerResult = createSelector(
  selectTopicState,
  (state: ITopicState) => state.searchTopicsFromDrawerResult
);
