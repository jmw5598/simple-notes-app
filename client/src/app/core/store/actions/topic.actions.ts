import { createAction, props } from '@ngrx/store';
import { Topic } from '@sn/shared/models';

export enum TopicActions {
  GET_ALL_TOPICS = '[Topic] Get All Topics',
  GET_ALL_TOPICS_SUCCESS = '[Topic] Get All Topics Success',
  CREATE_TOPIC = '[Topic] Create Topic',
  CREATE_TOPIC_SUCCESS = '[Topic] Create Topic Success',
  DELETE_TOPIC = '[Topic] Delete Topic',
  DELETE_TOPIC_SUCCESS = '[Topic] Delete Topic Success',
  UPDATE_TOPIC = '[Topic] Update Topic',
  UPDATE_TOPIC_SUCCESS = '[Topic] Update Topic Success',
}

export const getAllTopics = createAction(
  TopicActions.GET_ALL_TOPICS
);

export const getAllTopicsSuccess = createAction(
  TopicActions.GET_ALL_TOPICS_SUCCESS,
  props<{ topics: Topic[] }>()
);

export const createTopic = createAction(
  TopicActions.CREATE_TOPIC,
  props<{ topic: Topic }>()
);

export const createTopicSuccess = createAction(
  TopicActions.CREATE_TOPIC_SUCCESS,
  props<{ topic: Topic }>()
);

export const deleteTopic = createAction(
  TopicActions.DELETE_TOPIC,
  props<{ id: number }>()
);

export const deleteTopicSuccess = createAction(
  TopicActions.DELETE_TOPIC_SUCCESS,
  props<{ topic: Topic }>()
);

export const updateTopic = createAction(
  TopicActions.UPDATE_TOPIC,
  props<{ id: number, topic: Topic }>()
);

export const updateTopicSuccess = createAction(
  TopicActions.UPDATE_TOPIC_SUCCESS,
  props<{ topic: Topic }>()
);
