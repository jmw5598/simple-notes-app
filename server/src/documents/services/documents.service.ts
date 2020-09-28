import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { DocumentMapper } from '../mappers/document.mapper';
import { DocumentDto } from '../dtos/document.dto'
import { Document } from '../entities/document.entity';
import { DocumentNotFoundException } from '../exceptions/document-not-found.exception';

@Injectable()
export class DocumentsService {
  constructor(
    @InjectRepository(Document)
    private readonly _documentsRepository: Repository<Document>
  ) { }

  public async createDocument(accountId: number, createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
    const document: Document = this._documentsRepository.create({
      name: createDocumentDto.name,
      account: { id: accountId }
    });
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
}
