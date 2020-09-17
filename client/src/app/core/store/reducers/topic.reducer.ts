import { createReducer, on } from '@ngrx/store';
import { getAllTopicsSuccess, deleteTopicSuccess, setSelectedTopic } from '../actions/topic.actions';
import { initialTopicState } from '../state/topic.state';
import { Topic } from '@sn/shared/models';
import { selectSelectedTopic } from '../selectors';

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
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}

