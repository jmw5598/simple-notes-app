import { Body, Controller, Delete, Get, Param, Post, Query, Request, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { PageRequest } from 'src/common/models/page-request.model';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { CreateFlashcardSetDto } from '../dtos/create-flashcard-set.dto';
import { FlashcardSetDto } from '../dtos/flashcard-set.dto';
import { FlashcardsService } from '../services/flashcards.service';

@Controller('flashcards')
@UseGuards(JwtAuthenticationGuard)
export class FlashcardsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _flashcardsService: FlashcardsService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Post()
  public async createFlashcardSet(
      @Request() request,
      @Body() createFlashcardSetDto: CreateFlashcardSetDto): Promise<FlashcardSetDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._flashcardsService.createFlashcardSet(accountId, createFlashcardSetDto);
    } catch (error) {
      this._logger.error(`Error creating new flashcard set!`, error);
      throw error;
    }
  }

  @Get('search')
  public async serachFlashcardSets(
      @Request() request,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<any>> {
    try {
      const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
      const accountId: number = +request.user.accountId;
      return this._flashcardsService.searchFlashcardSets(accountId, searchTerm, pageable); 
    } catch (error) {
      this._logger.error('Error searching flashcard sets!', error);
      throw error;
    }
  }

  @Get(':id')
  public async getFlashcardSetById(
      @Request() request,
      @Param('id') flashcardSetId: number): Promise<FlashcardSetDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._flashcardsService.getFlashcardSetById(accountId, +flashcardSetId);
    } catch (error) {
      this._logger.error(`Error getting flashcard set by id!`, error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteFlashcardSetById(
      @Request() request,
      @Param('id') flashcardSetId: number): Promise<FlashcardSetDto> {
    try {
      console.log("INSIDE FLASCHARS CONTROLLLER READY TO DELETE!!!!\n\n\n")
      const accountId: number = +request.user.accountId;
      return this._flashcardsService.deleteFlashcardSetById(accountId, flashcardSetId);
    } catch (error) {
      this._logger.error(`Error deleteing flashcard set by id!`, error);
      throw error;
    }
  }
}
