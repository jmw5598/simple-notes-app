import { Controller, Request, Body, Delete, Get, Post, Put, Param } from '@nestjs/common';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { Document } from '../entities/document.entity';
import { DocumentDto } from '../dtos/document.dto';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { DocumentsService } from '../services/documents.service';
import { request } from 'express';

@Controller('documents')
export class DocumentsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _documentsService: DocumentsService
  ) {}

  @Post()
  public async createDocument(
      @Request() request,
      @Body() createDocumentDto: CreateDocumentDto): Promise<DocumentDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.createDocument(accountId, createDocumentDto);
    } catch (error) {
      this._logger.error('Error create new document!', error);
      throw error;
    }
  }

  @Get()
  public async getAllDocuments(): Promise<Document[]> {
    try {
      return [] as Document[];
    } catch (error) {
      this._logger.error('Error getting all documents!', error);
      throw error;
    }
  }

  @Get(':id')
  public async getDocumentById(
      @Request() request,
      @Param('id') documentId: number): Promise<DocumentDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.getDocumentById(accountId, documentId);
    } catch (error) {
      this._logger.error('Error getting document by id!', error);
      throw error;
    }
  }

  @Put(':id')
  public async updateDocumentById(): Promise<Document> {
    try {
      return {} as Document;
    } catch (error) {
      this._logger.error('Error updating document by id!', error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteDocumentById(): Promise<Document> {
    try {
      return {} as Document;
    } catch (error) {
      this._logger.error('Error deleting document by id!', error);
      throw error;
    }
  }
}
