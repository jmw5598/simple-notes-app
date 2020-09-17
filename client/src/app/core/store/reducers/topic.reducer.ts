import { createReducer, on } from '@ngrx/store';
import { getAllTopicsSuccess } from '../actions/topic.actions';
import { initialTopicState } from '../state/topic.state';

const _topicReducer = createReducer(
  initialTopicState,
  on(getAllTopicsSuccess, (state, { topics }) => {
    return {
      ...state,
      topics: topics
    }
  })
);

export function topicReducer(state, action) {
  return _topicReducer(state, action);
}

