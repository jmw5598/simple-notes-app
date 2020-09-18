import { createReducer, on } from '@ngrx/store';
import { initialTopicState } from '../state/topic.state';
import { Topic } from '@sn/shared/models';
import { 
  getAllTopicsSuccess, 
  deleteTopicSuccess, 
  setSelectedTopic, 
  setSelectedSection,
  deleteSectionSuccess } from '../actions/topic.actions';

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
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}
