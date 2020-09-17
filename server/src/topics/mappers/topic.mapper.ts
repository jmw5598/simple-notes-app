import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/topic.dto';
import { TopicsController } from '../controllers/topics.controller';

export class TopicMapper {
  public static toTopicDto(topic: Topic): TopicDto {
    return {
      id: topic.id,
      title: topic.title,
      synopsis: topic.synopsis,
      permission: topic.permission,
      createdAt: topic.createdAt,
      updatedAt: topic.updatedAt
    } as TopicDto;
  }

  public static toTopicDtoList(topics: Topic[]): TopicDto[] {
    return topics.map(topic => TopicMapper.toTopicDto(topic));
  }
}