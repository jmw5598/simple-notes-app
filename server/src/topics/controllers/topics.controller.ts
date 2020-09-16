import { Controller, Get, Param } from '@nestjs/common';
import { TopicsService } from '../services/topics.service';
import { SnLoggerService } from '../../logger/sn-logger.service';

@Controller('topics')
export class TopicsController {
  constructor(
    private readonly _sectionsService: TopicsService,
    private readonly _logger: SnLoggerService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get(':id')
  public async getTopicById(@Param('id') topicId: number): Promise<any> {
    return { topic: "This is a topic" };
  }
}
