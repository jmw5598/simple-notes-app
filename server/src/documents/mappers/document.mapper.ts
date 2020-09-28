import { DocumentsController } from '../controllers/documents.controller';
import { DocumentDto } from '../dtos/document.dto';
import { Document } from '../entities/document.entity';
import { SectionMapper } from '../../topics/mappers/section.mapper';

export class DocumentMapper {
  public static toDocumentDto(document: Document): DocumentDto {
    return {
      id: document.id,
      createdAt: document.createdAt,
      updatedAt: document.updatedAt,
      name: document.name,
      sections: SectionMapper.toSectionDtoList(document.sections)
    } as DocumentDto
  }

  public static toDocumentDtoList(documents: Document[]): DocumentDto[] {
    return documents.map(document => DocumentMapper.toDocumentDto(document));
  }
}
