import { ResponseMessage } from '@sn/core/models';
import { Topic, Section, FileResponse } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[],
  selectedTopic: Topic,
  selectedSection: Section,
  createTopicResponseMessage: ResponseMessage
  createSectionResponseMessage: ResponseMessage,
  updateTopicResponseMessage: ResponseMessage,
  updateSectionResponseMessage: ResponseMessage,
  updateSectionNotesResponseMessage: ResponseMessage,
  exportTopicResponseMessage: ResponseMessage,
  exportTopicFileResponse: FileResponse
};

export const initialTopicState: ITopicState = {
  topics: null,
  selectedTopic: null,
  selectedSection: null,
  createTopicResponseMessage: null,
  createSectionResponseMessage: null,
  updateTopicResponseMessage: null,
  updateSectionResponseMessage: null,
  updateSectionNotesResponseMessage: null,
  exportTopicResponseMessage: null,
  exportTopicFileResponse: null
};
