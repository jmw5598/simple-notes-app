import { Topic, Section } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[],
  selectedTopic: Topic,
  selectedSection: Section
};

export const initialTopicState: ITopicState = {
  topics: null,
  selectedTopic: null,
  selectedSection: null
};
