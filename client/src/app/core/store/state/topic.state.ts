import { ResponseMessage } from '@sn/core/models';
import { Page } from '@sn/core/models';
import { Topic, Section, FileResponse } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[],
  selectedTopic: Topic,
  createTopicResponseMessage: ResponseMessage,
  updateTopicResponseMessage: ResponseMessage,
  exportTopicResponseMessage: ResponseMessage,
  exportTopicFileResponse: FileResponse,
  searchTopicsResult: Page<Topic>,
  searchTopicsFromDrawerResult: Page<Topic>

};

export const initialTopicState: ITopicState = {
  topics: null,
  selectedTopic: null,
  createTopicResponseMessage: null,
  updateTopicResponseMessage: null,
  exportTopicResponseMessage: null,
  exportTopicFileResponse: null,
  searchTopicsResult: null,
  searchTopicsFromDrawerResult: null
};
