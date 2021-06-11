import { createAction, props } from '@ngrx/store';
import { Page, PageableSearch, ResponseMessage } from '@sn/user/core/models';
import { Topic, ExportConfig, FileResponse } from '@sn/user/shared/models';

export const getAllTopics = createAction(
  '[Topic] Get All Topics'
);

export const getAllTopicsSuccess = createAction(
  '[Topic] Get All Topics Success',
  props<{ topics: Topic[] }>()
);

export const getTopicById = createAction(
  '[Topic] Get Topic By Id',
  props<{ id: number}>()
);

export const setSelectedTopic = createAction(
  '[Topic] Set Selected Topic',
  props<{ topic: Topic }>()
);

export const createTopic = createAction(
  '[Topic] Create Topic',
  props<{ topic: Topic }>()
);

export const createTopicSuccess = createAction(
  '[Topic] Create Topic Success',
  props<{ topic: Topic }>()
);

export const deleteTopic = createAction(
  '[Topic] Delete Topic',
  props<{ id: number }>()
);

export const deleteTopicSuccess = createAction(
  '[Topic] Delete Topic Success',
  props<{ topic: Topic }>()
);

export const updateTopic = createAction(
  '[Topic] Update Topic',
  props<{ id: number, topic: Topic }>()
);

export const updateTopicSuccess = createAction(
  '[Topic] Update Topic Success',
  props<{ topic: Topic }>()
);

export const setCreateTopicResponseMessage = createAction(
  '[Topic] Set Create Topic Response Message',
  props<{ message: ResponseMessage }>()
);

export const setUpdateTopicResponseMessage = createAction(
  '[Topic] Set Update Topic Response Message',
  props<{ message: ResponseMessage }>()
);

export const exportTopic = createAction(
  '[Topic] Export Topic',
  props<{ topicId: number, config: ExportConfig }>()
);

export const exportTopicSuccess = createAction(
  '[Topic] Export Topic Success',
  props<{ file: FileResponse }>()
);

export const setExportTopicResponseMessage = createAction(
  '[Topic] Export Topic Response Message',
  props<{ message: ResponseMessage }>()
);

export const setExportTopicFileResponse = createAction(
  '[Topic] Export Topic File Response',
  props<{ file: FileResponse }>()
);

export const searchTopics = createAction(
  '[Topic] Search Topic',
  props<{ search: PageableSearch }>()
);

export const searchTopicsResult = createAction(
  '[Topic] Search Topic Result',
  props<{ page: Page<Topic> }>()
);

export const searchTopicsFromDrawer = createAction(
  '[Topic] Search Topic From Drawer',
  props<{ search: PageableSearch }>()
);

export const searchTopicsFromDrawerResult = createAction(
  '[Topic] Search Topic From Drawer Result',
  props<{ page: Page<Topic> }>()
);
