import { Topic } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[],
  selectedTopic: Topic
};

export const initialTopicState: ITopicState = {
  topics: null,
  selectedTopic: null
};
