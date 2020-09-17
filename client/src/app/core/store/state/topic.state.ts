import { Topic } from '@sn/shared/models';

export interface ITopicState {
  topics: Topic[]
};

export const initialTopicState: ITopicState = {
  topics: null
};
