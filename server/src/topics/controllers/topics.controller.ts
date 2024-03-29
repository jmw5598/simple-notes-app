import { Body, Controller, Delete, Get, Param, Post, Put, Request, Res, UseGuards, HttpCode, Header, Query } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { TopicsService } from '../services/topics.service';
import { SectionsService } from '../services/sections.service';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { TopicDto } from '../dtos/topic.dto';
import { SectionDto } from '../dtos/section.dto';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { ExportConfig } from '../models/export-config.model';
import { DocumentsService } from '../services/documents.service';
import { Readable } from 'stream';

import { IPageable } from '../../common/models/pageable.interface';
import { Page } from '../../common/models/page.model';
import { PageRequest } from '../../common/models/page-request.model';
import { SortDirection } from '../../common/enums/sort-direction.enum';
import { Topic } from '../entities/topic.entity';

@Controller('topics')
@UseGuards(JwtAuthenticationGuard)
export class TopicsController {
  constructor(
    private readonly _topicsService: TopicsService,
    private readonly _sectionsService: SectionsService,
    private readonly _documentsService: DocumentsService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Post()
  public async createTopic(
      @Request() request, 
      @Body() createTopicDto: CreateTopicDto): Promise<TopicDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.createTopic(accountId, createTopicDto);
    } catch (error) {
      this._logger.error('Error create new topic!', error);
      throw error;
    }
  }

  @Get()
  public async getAllTopics(@Request() request): Promise<TopicDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.getAllTopics(accountId);
    } catch (error) {
      this._logger.error('Error getting all topics!', error);
      throw error;
    }
  }

  @Get('search')
  public async serachProductItems(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'title',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<TopicDto>> {
    const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
    const accountId: number = req.user.accountId;
    return this._topicsService.searchTopics(accountId, searchTerm, pageable);  
  }

  @Get(':topicId')
  public async getTopicById(
      @Request() request,
      @Param('topicId') topicId: number): Promise<any> {
    try {
      const accountId: number = +request.user.accountId;
      const topic: TopicDto = await this._topicsService.getTopicById(accountId, topicId);
      return topic;
    } catch (error) {
      this._logger.error('Error getting all topics!', error);
      throw error;
    }
  }

  @Put(':topicId')
  public async updateTopicById(
      @Request() request, 
      @Param('topicId') topicId: number, 
      @Body() updateTopicDto: UpdateTopicDto): Promise<TopicDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.updateTopic(accountId, topicId, updateTopicDto);
    } catch (error) {
      this._logger.error('Error updating topic!', error);
      throw error;
    }
  }

  @Delete(':topicId')
  public async deleteTopicById(
      @Request() request, 
      @Param('topicId') topicId: number): Promise<TopicDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.deleteTopic(accountId, topicId);
    } catch (error) {
      this._logger.error('Error deleting topic!', error);
      throw error;
    }
  }

  @Post(':topicId/download')
  @HttpCode(201)
  @Header('Content-Type', 'application/octet-stream')
  @Header('Access-Control-Expose-Headers', 'Content-Disposition')
  public async exportTopicById(
      @Request() request,
      @Res() response,
      @Param('topicId') topicId: number,
      @Body() config: ExportConfig): Promise<Readable> {
    try {
      const accountId: number = +request.user.accountId;
      const topicDto: TopicDto = await this._topicsService.getTopicById(accountId, topicId);
      const sectionDtos: SectionDto[] = await this._sectionsService.getSectionsByTopicId(accountId, topicId);
      topicDto.sections = sectionDtos;

      const fileStream: Readable = await this._documentsService.exportTopic(topicDto, config);
      const filename = await this._documentsService.getFilename(topicDto.title, config);

      response.set({
        'Content-Disposition': `attachment; filename=${filename}`,
      });

      fileStream.pipe(response);
      return;
      
    } catch (error) {
      this._logger.error('Error exporting topic!', error);
      throw error;
    }
      
  }
}
