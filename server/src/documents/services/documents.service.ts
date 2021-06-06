import { Inject, Injectable } from '@nestjs/common';
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
import { DocumentTopic } from '../entities/document-topic.entity';
import { DocumentTopicSection } from '../entities/document-topic-section.entity';
import { DocumentMarkdownDto } from '../dtos/document-markdown.dto';
import { DocumentBuilderService } from '../../common/services/document-builder/services/document-builder.service';
import { ExportConfig } from 'src/common/services/document-builder/models/export-config.model';
import { Readable } from 'typeorm/platform/PlatformTools';
import { doc } from 'prettier';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly _documentsRepository: Repository<Document>,
    @InjectRepository(DocumentTopic)
    private readonly _documentTopicRepository: Repository<DocumentTopic>,
    @InjectRepository(DocumentTopicSection)
    private readonly _documentTopicSectionRepository: Repository<DocumentTopicSection>,
    private readonly _documentBuilderService: DocumentBuilderService
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
      relations: ['documentTopics'],
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
    const document: Document = await this._documentsRepository.save(
      this._documentsRepository.create({
        name: createDocumentDto.name,
        account: { id: accountId },
        documentTopics: createDocumentDto.documentTopics.map((documentTopic, dtOrderIndex) => {
          return this._documentTopicRepository.create({
            ...documentTopic,
            orderIndex: dtOrderIndex,
            documentTopicSections: documentTopic.documentTopicSections.map((documentTopicSection, dtsOrderIndex) => {
              return {
                ...documentTopicSection,
                orderIndex: dtsOrderIndex
              }
            })
          })
        })
      })
    );
    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document))
  }

  public async getDocumentById(accountId: number, documentId: number): Promise<DocumentDto> {
    const document: Document = await this._findDocumentById(accountId, documentId);
    if (!document) throw new DocumentNotFoundException();
    return DocumentMapper.toDocumentDto(document);
  }

  public async getDocumentMarkdownById(accountId: number, documentId: number): Promise<DocumentMarkdownDto> {
    const document: Document = await this._findDocumentById(accountId, documentId);
    if (!document) throw new DocumentNotFoundException();
    const markdownTopicString: string = this._documentBuilderService.documentToMarkdown(document);
    return {
      document: await this.getDocumentById(accountId, documentId),
      markdown: markdownTopicString || '' 
    } as DocumentMarkdownDto;
  }

  public async updateDocument(accountId: number, documentId: number, updateDocumentDto: UpdateDocumentDto): Promise<DocumentDto> {
    const document: Document = await this._documentsRepository.findOne({
      id: documentId,
      account: { id: accountId }
    });

    if (!document) throw new DocumentNotFoundException();
    
    document.documentTopics = updateDocumentDto.documentTopics.map((documentTopic, dtOrderIndex) => {
      return this._documentTopicRepository.create({
        ...documentTopic,
        orderIndex: dtOrderIndex,
        documentTopicSections: documentTopic.documentTopicSections.map((documentTopicSection, dtsOrderIndex) => {
          return this._documentTopicSectionRepository.create({
            ...documentTopicSection,
            orderIndex: dtsOrderIndex
          })
        })
      })
    });

    document.updatedAt = new Date();

    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document)); 
  }

  public async deleteDocument(accountId: number, documentId: number): Promise<DocumentDto> {
    let document: Document = await this._documentsRepository.findOne({
      relations: [
        'documentTopics', 
        'documentTopics.topic', 
        'documentTopics.documentTopicSections', 
        'documentTopics.documentTopicSections.section'
      ],
      where: {
        id: documentId,
        account: { id: accountId }
      }
    });
    
    if (!document) throw new DocumentNotFoundException();

    const now: Date = new Date();

    document.documentTopics.forEach(documentTopic => {
      documentTopic.deletedAt = now; 
      documentTopic.documentTopicSections
        .forEach(documentTopicSection =>  documentTopicSection.deletedAt = now)
    });
    document.deletedAt = now;

    return DocumentMapper.toDocumentDto(await this._documentsRepository.save(document));
  }

  public async generateFilename(title: string, exportConfig: ExportConfig): Promise<string> {
    return this._documentBuilderService.getFilename(title, exportConfig);
  }

  public async exportDocument(accountId: number, documentId: number, exportConfig: ExportConfig): Promise<Readable> {
    const document: Document = await this._findDocumentById(accountId, documentId);
    if (!document) throw new DocumentNotFoundException();
    return this._documentBuilderService.exportDocument(document, exportConfig);
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

  private async _findDocumentById(accountId: number, documentId: number): Promise<Document> {
    return this._documentsRepository.createQueryBuilder('doc')
      .innerJoin('doc.account', 'account')
      .innerJoinAndSelect('doc.documentTopics', 'dt')
      .innerJoinAndSelect('dt.topic', 'topic')
      .leftJoinAndSelect('dt.documentTopicSections', 'dts')
      .leftJoinAndSelect('dts.section', 's')
      .where('account.id = :accountId', { accountId: accountId })
      .andWhere('doc.id = :documentId', { documentId: documentId })
      .orderBy({ 
        'dt.orderIndex': 'ASC',
        'dts.orderIndex': 'ASC'
      }).getOne();
  }
}
