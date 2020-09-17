import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITopicState } from '../state/topic.state';

export const selectTopicState = createFeatureSelector<ITopicState>("topics");

export const selectTopics = createSelector(
  selectTopicState,
  (state: ITopicState) => state.topics
);
