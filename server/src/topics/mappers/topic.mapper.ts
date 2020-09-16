import { Topic } from '../entities/topic.entity';
import { TopicDto } from '../dtos/topic.dto';

export class TopicMapper {
  public static toTopicDto(section: Topic): TopicDto {
    return {
      id: section.id,
      title: section.title,
      synopsis: section.synopsis
    } as TopicDto;
  }
}