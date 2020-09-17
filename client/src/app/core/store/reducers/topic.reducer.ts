import { createReducer, on } from '@ngrx/store';
import { getAllTopicsSuccess, deleteTopicSuccess } from '../actions/topic.actions';
import { initialTopicState } from '../state/topic.state';
import { Topic } from '@sn/shared/models';

const _topicReducer = createReducer(
  initialTopicState,
  on(getAllTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      topics: topics
    }
  }),
  on(deleteTopicSuccess, (state, { topic }) => {
    console.log("parse out topic by id and update topics")
    const topics: Topic[] = state.topics.filter(t => t.id === topic.id);
    return {
      ...state,
      topics: topics
    }
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}

