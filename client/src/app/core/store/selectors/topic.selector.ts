import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ITopicState } from '../state/topic.state';

export const selectTopicState = createFeatureSelector<ITopicState>("topics");

export const selectTopics = createSelector(
  selectTopicState,
  (state: ITopicState) => state.topics
);

export const selectSelectedTopic = createSelector(
  selectTopicState,
  (state: ITopicState) => state.selectedTopic
);

export const selectSelectedSection = createSelector(
  selectTopicState,
  (state: ITopicState) => state.selectedSection
);

export const selectCreateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.createTopicResponseMessage
);

export const selectCreateSectionResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.createSectionResponseMessage
);

export const selectUpdateTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.updateTopicResponseMessage
);

export const selectUpdateSectionResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.updateSectionResponseMessage
);

export const selectUpdateSectionNotesResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.updateSectionNotesResponseMessage
);

export const selectExportTopicResponseMessage = createSelector(
  selectTopicState,
  (state: ITopicState) => state.exportTopicResponseMessage
);

export const selectExportTopicFile = createSelector(
  selectTopicState,
  (state: ITopicState) => state.exportTopicFileResponse
);
