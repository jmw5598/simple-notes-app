import { SectionMapper } from 'src/topics/mappers/section.mapper';
import { DocumentTopicSectionDto } from '../dtos/document-topic-section.dto';
import { DocumentTopicSection } from '../entities/document-topic-section.entity';

export class DocumentTopicSectionMapper {
  public static toDocumentTopicSectionDto(documentTopicSection: DocumentTopicSection): DocumentTopicSectionDto {
    return {
      id: documentTopicSection.id,
      createdAt: documentTopicSection.createdAt,
      updatedAt: documentTopicSection.updatedAt,
      section: SectionMapper.toSectionDto(documentTopicSection.section)
    } as DocumentTopicSectionDto
  }

  public static toDocumentTopicSectionDtoList(documentTopicSections: DocumentTopicSection[]): DocumentTopicSectionDto[] {
    return documentTopicSections?.map(section => DocumentTopicSectionMapper.toDocumentTopicSectionDto(section)) || [];
  }
}