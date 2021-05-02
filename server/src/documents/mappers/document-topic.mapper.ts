import { TopicMapper } from 'src/topics/mappers/topic.mapper';
import { DocumentTopicDto } from '../dtos/document-topic.dto';
import { DocumentTopic } from '../entities/document-topic.entity';
import { DocumentTopicSectionMapper } from './document-topic-section.mapper';

export class DocumentTopicMapper {
  public static toDocumentTopicDto(documentTopic: DocumentTopic): DocumentTopicDto {
    return {
      id: documentTopic.id,
      createdAt: documentTopic.createdAt,
      updatedAt: documentTopic.updatedAt,
      topic: documentTopic?.topic ? TopicMapper.toTopicDto(documentTopic?.topic) : null,
      documentTopicSections: DocumentTopicSectionMapper.toDocumentTopicSectionDtoList(documentTopic.documentTopicSections) || []
    } as DocumentTopicDto
  }

  public static toDocumentTopicDtoList(documentTopics: DocumentTopic[]): DocumentTopicDto[] {
    return documentTopics.map(documentTopic => DocumentTopicMapper.toDocumentTopicDto(documentTopic));
  }
}