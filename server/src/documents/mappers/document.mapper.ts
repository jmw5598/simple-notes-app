import { DocumentDto } from '../dtos/document.dto';
import { Document } from '../entities/document.entity';
import { DocumentTopicMapper } from './document-topic.mapper';

export class DocumentMapper {
  public static toDocumentDto(document: Document): DocumentDto {
    return {
      id: document.id,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      name: document.name,
      documentTopics: DocumentTopicMapper.toDocumentTopicDtoList(document.documentTopics)
    } as DocumentDto
  }

  public static toDocumentDtoList(documents: Document[]): DocumentDto[] {
    return documents.map(document => DocumentMapper.toDocumentDto(document));
  }
}
