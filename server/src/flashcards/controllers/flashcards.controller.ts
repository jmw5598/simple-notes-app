import { Controller, Get, Query, Request } from '@nestjs/common';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { Page } from 'src/common/models/page.model';
import { SnLoggerService } from 'src/logger/sn-logger.service';

@Controller('flashcards')
export class FlashcardsController {
  constructor(
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get('search')
  public async serachFlashcardSets(
      @Request() req,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<any>> {
    try {
      return {
        elements: []
      } as Page<any>
    } catch (error) {
      this._logger.error('Error searching flashcard sets!', error);
      throw error;
    }
  }
}
