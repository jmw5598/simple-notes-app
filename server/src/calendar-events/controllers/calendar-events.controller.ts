import { Controller, Get, Request } from '@nestjs/common';
import { CalendarEventsService } from '../services/calendar-events.service';
import { CalendarEventDto } from '../dtos/calendar-event.dto';
import { SnLoggerService } from '../../logger/sn-logger.service';

@Controller('calendar/events')
export class CalendarEventsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _calendarEventsService: CalendarEventsService
  ) {
    this._logger.setContext(this.constructor.name);
  }
}
