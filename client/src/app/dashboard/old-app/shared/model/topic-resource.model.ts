import { Topic } from './topic.model';

export class TopicResource {
  constructor(
    public topic: Topic,
    public _links: Object
  ) {}
}
