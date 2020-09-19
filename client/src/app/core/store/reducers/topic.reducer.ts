import { createReducer, on } from '@ngrx/store';
import { initialTopicState } from '../state/topic.state';
import { Topic } from '@sn/shared/models';
import { 
  getAllTopicsSuccess, 
  deleteTopicSuccess, 
  setSelectedTopic, 
  setSelectedSection,
  deleteSectionSuccess,
  setCreateSectionResponseMessage,
  setCreateTopicResponseMessage,
  setUpdateSectionNotesResponseMessage, 
  exportTopicSuccess, 
  setExportTopicResponseMessage, 
  setExportTopicFileResponse } from '../actions/topic.actions';

const _topicReducer = createReducer(
  initialTopicState,
  on(getAllTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      topics: topics
    }
  }),
  on(deleteTopicSuccess, (state, { topic }) => {
    const topics: Topic[] = state.topics.filter(t => t.id !== topic.id);
    return {
      ...state,
      topics: topics
    }
  }),
  on(setSelectedTopic, (state, { topic }) => {
    return {
      ...state,
      selectedTopic: topic
    }
  }),
  on(setSelectedSection, (state, { section }) => {
    return {
      ...state,
      selectedSection: section
    }
  }),
  on(deleteSectionSuccess, (state, { section }) => {
    const selectedTopic: Topic = { ...state.selectedTopic };
    selectedTopic.sections = selectedTopic.sections.filter(s => s.id !== section.id);
    return {
      ...state,
      selectedTopic: selectedTopic
    };
  }),
  on(setCreateTopicResponseMessage, (state, { message }) => {
    return {
      ...state,
      createTopicResponseMessage: message
    }
  }),
  on(setCreateSectionResponseMessage, (state, { message }) => {
    return {
      ...state,
      createSectionResponseMessage: message
    }
  }),
  on(setUpdateSectionNotesResponseMessage, (state, { message }) => {
    return {
      ...state,
      updateSectionNotesResponseMessage: message
    }
  }),
  on(exportTopicSuccess, (state, { file }) => {
    return {
      ...state,
      exportTopicFileResponse: file
    }
  }),
  on(setExportTopicResponseMessage, (state, { message }) => {
    return {
      ...state,
      exportTopicResponseMessage: message
    }
  }),
  on(setExportTopicFileResponse, (state, { file }) => {
    return {
      ...state,
      exportTopicFileResponse: file
    }
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}
