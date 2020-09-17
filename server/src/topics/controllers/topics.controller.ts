import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { TopicsService } from '../services/topics.service';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { CreateTopicDto } from '../dtos/create-topic.dto';
import { TopicDto } from '../dtos/topic.dto';
import { UpdateTopicDto } from '../dtos/update-topic.dto';
import { request } from 'express';

@Controller('topics')
@UseGuards(JwtAuthenticationGuard)
export class TopicsController {
  constructor(
    private readonly _topicsService: TopicsService,
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

  @Get(':id')
  public async getTopicById(@Param('id') topicId: number): Promise<any> {
    return { topic: "This is a topic" };
  }

  @Put(':id')
  public async updateTopicById(
      @Request() request, 
      @Param('id') topicId: number, 
      @Body() updateTopicDto: UpdateTopicDto): Promise<TopicDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.updateTopic(accountId, topicId, updateTopicDto);
    } catch (error) {
      this._logger.error('Error updating topic!', error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteTopicById(
      @Request() request, 
      @Param('id') topicId: number): Promise<TopicDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._topicsService.deleteTopic(accountId, topicId);
    } catch (error) {
      this._logger.error('Error deleting topic!', error);
      throw error;
    }
  }
}
