import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Repository, Raw } from 'typeorm';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { DocumentMapper } from '../mappers/document.mapper';
import { DocumentDto } from '../dtos/document.dto'
import { Document } from '../entities/document.entity';
import { DocumentNotFoundException } from '../exceptions/document-not-found.exception';
import { IPageable } from 'src/common/models/pageable.interface';
import { Page } from 'src/common/models/page.model';
import { UpdateDocumentDto } from '../dtos/update-document.dto';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly _documentsRepository: Repository<Document>
  ) { }

  public async getAllDocuments(accountId: number): Promise<DocumentDto[]> {
    const documents: Document[] = await this._documentsRepository.find({
      relations: ['sections'],
      where: {
        account: { id: accountId },
        deletedAt: IsNull()
      }
    });
    return DocumentMapper.toDocumentDtoList(documents);
  }

  public async searchDocuments(accountId: number, searchTerm: string, pageable: IPageable): Promise<Page<DocumentDto>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const where = await this._generateSearchWhereClause(accountId, searchTerm);
    const result = await this._documentsRepository.findAndCount({
      relations: ['sections'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: DocumentDto[] = DocumentMapper.toDocumentDtoList(result[0]);
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async createDocument(accountId: number, createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
    const document: Document = this._documentsRepository.create({
      name: createDocumentDto.name,
      account: { id: accountId },
      sections: createDocumentDto.sections || []
    });

    // TODO how are sections persisted??

    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document))
  }

  public async getDocumentById(accountId: number, documentId: number): Promise<DocumentDto> {
    const document: Document = await this._documentsRepository.findOne({
      id: documentId,
      account: { id: accountId }
    });
    if (!document) throw new DocumentNotFoundException();
    return DocumentMapper.toDocumentDto(document);
  }

  public async updateDocument(accountId: number, documentId: number, updateDocumentDto: UpdateDocumentDto): Promise<DocumentDto> {
    const document: Document = await this._documentsRepository.findOne({
      id: documentId,
      account: { id: accountId }
    });
    if (!document) throw new DocumentNotFoundException();
    document.name = updateDocumentDto.name;
    
    // TODO Update the sections associated wit this document

    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document)); 
  }

  public async deleteDocument(accountId: number, documentId: number): Promise<DocumentDto> {
    const document: Document = await this._documentsRepository.findOne({
      id: documentId,
      account: { id: accountId }
    });
    if (!document) throw new DocumentNotFoundException();
    document.deletedAt = new Date();
    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document));
  }

  private async _generateSearchWhereClause(accountId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { name: ilike, account: { id: accountId }, deletedAt: IsNull() }
    ];
  }

  private async _generatePageResult(elements: DocumentDto[], totalElements: number, pageable: IPageable): Promise<Page<DocumentDto>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<DocumentDto>;
  }
}
