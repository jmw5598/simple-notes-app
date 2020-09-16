import { Controller, Get, Post, Param, Request, Body, UseGuards } from '@nestjs/common';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { SectionDto } from '../dtos/section.dto';
import { CreateSectionDto } from '../dtos/create-section.dto';
import { SectionsService } from '../services/sections.service';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { request } from 'express';

@Controller('topics/:topicId/sections')
@UseGuards(JwtAuthenticationGuard)
export class SectionsController {
  constructor(
    private readonly _sectionsService: SectionsService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Post()
  public async createTopic(
      @Request() request, 
      @Param('topicId') topicId: number, 
      @Body() createTopicDto: CreateSectionDto): Promise<SectionDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.createSection(accountId, topicId, createTopicDto);
    } catch (error) {
      this._logger.error('Error create new section!', error)
      throw error;
    }
  }

  @Get()
  public async getSectionsByTopic(@Param('topicId') topicId: number): Promise<any> {
    return { sections: `These are sections for topic with id ${topicId}` };
  }

  @Get(':sectionId')
  public async getSectionById(
      @Request() request,
      @Param('topicId') topicId: number,
      @Param('sectionId') sectionId: number) {
    try {
      const accountId: number = +request.user.accountId;
      return this._sectionsService.getSectionById(accountId, topicId, sectionId);
    } catch (error) {
      this._logger.error('Error getting section by id!', error)
    }
  }
}
