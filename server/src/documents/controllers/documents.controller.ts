import { Controller, Request, Body, Query, Delete, Get, Post, Put, Param, UseGuards, Req, RequestMethod, HttpCode, Header, Res } from '@nestjs/common';
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
import { DocumentMarkdownDto } from '../dtos/document-markdown.dto';
import { Readable } from 'typeorm/platform/PlatformTools';
import { ExportConfig } from 'src/common/services/document-builder/models/export-config.model';

@Controller('documents')
@UseGuards(JwtAuthenticationGuard)
export class DocumentsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _documentsService: DocumentsService
  ) {
    this._logger.setContext(this.constructor.name);
  }

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
  public async serachDocuments(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<DocumentDto>> {
    try {
      const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
      const accountId: number = req.user.accountId;
      return this._documentsService.searchDocuments(accountId, searchTerm, pageable); 
    } catch (error) {
      this._logger.error('Error searching documents!', error);
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

  @Get(':id/markdown')
  public async getDocumentMarkdownPreviewById(
      @Request() request,
      @Param('id') documentId: number): Promise<DocumentMarkdownDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._documentsService.getDocumentMarkdownById(accountId, documentId);
    } catch (error) {
      this._logger.error('Error getting document markdown by id!', error);
      throw error;
    }
  }

  @Post(':documentId/download')
  @HttpCode(201)
  @Header('Content-Type', 'application/octet-stream')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  public async exportTopicById(
      @Request() request,
      @Res() response,
      @Param('documentId') documentId: number,
      @Body() config: ExportConfig): Promise<Readable> {
    try {
      const accountId: number = +request.user.accountId;
      const fileStream: Readable = await this._documentsService.exportDocument(accountId, documentId, config);
      // TODO Changes the filename to document name instead of temp;
      const filename = await this._documentsService.generateFilename('temp', config);

      response.set({
        'Content-Disposition': `attachment; filename=${filename}`,
      });

      fileStream.pipe(response);
      return;
      
    } catch (error) {
      console.log("eRROR: ", error);
      this._logger.error('Error exporting topic!', error);
      throw error;
    }
      
  }
}
