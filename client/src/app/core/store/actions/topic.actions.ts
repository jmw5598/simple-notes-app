import { createAction, props } from '@ngrx/store';
import { ResponseMessage } from '@sn/core/models';
import { Topic, Section } from '@sn/shared/models';

export enum TopicActions {
  GET_ALL_TOPICS = '[Topic] Get All Topics',
  GET_ALL_TOPICS_SUCCESS = '[Topic] Get All Topics Success',
  GET_TOPIC_BY_ID = '[Topic] Get Topic By Id',
  SET_SELECTED_TOPIC = '[Topic] Set Selected Topic',
  CREATE_TOPIC = '[Topic] Create Topic',
  CREATE_TOPIC_SUCCESS = '[Topic] Create Topic Success',
  DELETE_TOPIC = '[Topic] Delete Topic',
  DELETE_TOPIC_SUCCESS = '[Topic] Delete Topic Success',
  UPDATE_TOPIC = '[Topic] Update Topic',
  UPDATE_TOPIC_SUCCESS = '[Topic] Update Topic Success',
  GET_SECTION_BY_ID = '[Section] Get Section By Id',
  SET_SELECTED_SECTION = '[Section] Set Selected Section',
  CREATE_SECTION = '[Section] Create Section',
  CREATE_SECTION_SUCCESS = '[Section] Create Section Success',
  DELETE_SECTION = '[Section] Delete Section',
  DELETE_SECTION_SUCCESS = '[Section] Delete Section Success',
  UPDATE_SECTION = '[Section] Update Section',
  UPDATE_SECTION_SUCCESS = '[Section] Update Section Success',
  SET_CREATE_TOPIC_RESPONSE_MESSAGE = '[Topic] Set Create Topic Response Message',
  SET_CREATE_SECTION_RESPONSE_MESSAGE = '[Topic] Set Create Section Response Message'
}

export const getAllTopics = createAction(
  TopicActions.GET_ALL_TOPICS
);

export const getAllTopicsSuccess = createAction(
  TopicActions.GET_ALL_TOPICS_SUCCESS,
  props<{ topics: Topic[] }>()
);

export const getTopicById = createAction(
  TopicActions.GET_TOPIC_BY_ID,
  props<{ id: number}>()
);

export const setSelectedTopic = createAction(
  TopicActions.SET_SELECTED_TOPIC,
  props<{ topic: Topic }>()
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

export const getSectionById = createAction(
  TopicActions.GET_SECTION_BY_ID,
  props<{ id: number}>()
);

export const setSelectedSection = createAction(
  TopicActions.SET_SELECTED_SECTION,
  props<{ section: Section }>()
);

export const createSection = createAction(
  TopicActions.CREATE_SECTION,
  props<{ topicId: number, section: Section }>()
);

export const createSectionSuccess = createAction(
  TopicActions.CREATE_SECTION_SUCCESS,
  props<{ section: Section }>()
);

export const deleteSection = createAction(
  TopicActions.DELETE_SECTION,
  props<{ topicId: number, sectionId: number }>()
);

export const deleteSectionSuccess = createAction(
  TopicActions.DELETE_SECTION_SUCCESS,
  props<{ section: Section }>()
);

export const updateSection = createAction(
  TopicActions.UPDATE_SECTION,
  props<{ id: number, section: Section }>()
);

export const updateSectionSuccess = createAction(
  TopicActions.UPDATE_SECTION_SUCCESS,
  props<{ section: Section }>()
);

export const setCreateTopicResponseMessage = createAction(
  TopicActions.SET_CREATE_TOPIC_RESPONSE_MESSAGE,
  props<{ message: ResponseMessage }>()
);

export const setCreateSectionResponseMessage = createAction(
  TopicActions.SET_CREATE_SECTION_RESPONSE_MESSAGE,
  props<{ message: ResponseMessage }>()
);
