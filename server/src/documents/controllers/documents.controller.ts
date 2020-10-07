import { Controller, Request, Body, Query, Delete, Get, Post, Put, Param, UseGuards } from '@nestjs/common';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { Document } from '../entities/document.entity';
import { DocumentDto } from '../dtos/document.dto';
import { CreateDocumentDto } from '../dtos/create-document.dto';
import { UpdateDocumentDto } from '../dtos/update-document.dto';
import { DocumentsService } from '../services/documents.service';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';
import { PageRequest } from '../../common/models/page-request.model';
import { SortDirection } from '../../common/enums/sort-direction.enum';
import { request } from 'express';

@Controller('documents')
@UseGuards(JwtAuthenticationGuard)
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
  public async getAllDocuments(@Request() request): Promise<DocumentDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.getAllDocuments(accountId);
    } catch (error) {
      this._logger.error('Error getting all documents!', error);
      throw error;
    }
  }

  @Get('search')
  public async serachProductItems(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<DocumentDto>> {
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
    const accountId: number = req.user.accountId;
    return this._documentsService.searchDocuments(accountId, searchTerm, pageable);  
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
  public async updateDocumentById(
      @Request() request,
      @Param('id') documentId: number,
      @Body() updateDocumentDto: UpdateDocumentDto): Promise<DocumentDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.updateDocument(accountId, documentId, updateDocumentDto);
    } catch (error) {
      this._logger.error('Error updating document by id!', error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteDocumentById(
      @Request() request,
      @Param('id') documentId: number): Promise<DocumentDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.deleteDocument(accountId, documentId);
    } catch (error) {
      this._logger.error('Error deleting document by id!', error);
      throw error;
    }
  }
}