import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { TopicsService } from '../services/topics.service';
import { SectionsService } from '../services/sections.service';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { TopicDto } from '../dtos/topic.dto';
import { SectionDto } from '../dtos/section.dto';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { ExportConfig } from '../models/export-config.dto';

@Controller('topics')
@UseGuards(JwtAuthenticationGuard)
export class TopicsController {
  constructor(
    private readonly _topicsService: TopicsService,
    private readonly _sectionsService: SectionsService,
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

  @Get(':topicId')
  public async getTopicById(
      @Request() request,
      @Param('topicId') topicId: number): Promise<any> {
    try {
      const accountId: number = +request.user.accountId;
      const topic: TopicDto = await this._topicsService.getTopicById(accountId, topicId);
      const sections: SectionDto[] = await this._sectionsService.getSectionsByTopicId(accountId, topicId);
      topic.sections = sections;
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
  public async exportTopicById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Body() config: ExportConfig): Promise<any> {
    try {
      this._logger.debug(`Export topic with id ${topicId}`);
      this._logger.debug(`Export topic with config ${config}`);
      return {} as TopicDto;
    } catch (error) {
      this._logger.error('Error exporting topic!', error);
      throw error;
    }
      
  }
}
