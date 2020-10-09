import { CalendarEventDto } from '../dtos/calendar-event.dto';
import { CalendarEvent } from '../entities/calendar-event.entity';

export class CalendarEventMapper {
  public static toCalendarEventDto(event: CalendarEvent): CalendarEventDto {
    return {
      id: event.id,
      title: event.title,
      startDateTime: event.startDateTime,
      endDateTime: event.endDateTime,
      isAllDay: event.isAllDay,
      location: event.location,
      description: event.description
    } as CalendarEventDto
  }

  public static toCalendarEventDtoList(events: CalendarEvent[]): CalendarEventDto[] {
    return events.map(event => CalendarEventMapper.toCalendarEventDto(event));
  }
}
