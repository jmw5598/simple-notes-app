import { ResponseMessage } from '@sn/core/models';
import { Topic, Section } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[],
  selectedTopic: Topic,
  selectedSection: Section,
  createTopicResponseMessage: ResponseMessage
  createSectionResponseMessage: ResponseMessage,
  updateSectionNotesResponseMessage: ResponseMessage,
  exportTopicResponseMessage: ResponseMessage,
  exportTopicFile: Blob
};

export const initialTopicState: ITopicState = {
  topics: null,
  selectedTopic: null,
  selectedSection: null,
  createTopicResponseMessage: null,
  createSectionResponseMessage: null,
  updateSectionNotesResponseMessage: null,
  exportTopicResponseMessage: null,
  exportTopicFile: null
};
