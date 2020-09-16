import { Controller, Get, Param } from '@nestjs/common';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { SectionsService } from '../services/sections.service';

@Controller('topics/:id/sections')
export class SectionsController {
  constructor(
    private readonly _sectionsService: SectionsService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  public async getSectionsByTopic(@Param('id') topicId: number): Promise<any> {
    return { sections: `These are sections for topic with id ${topicId}` };
  }
}
