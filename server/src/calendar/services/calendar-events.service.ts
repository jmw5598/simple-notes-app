import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MoreThanOrEqual, LessThanOrEqual, IsNull, Repository, Between } from 'typeorm';
import { CalendarEventMapper } from '../mappers/calendar-event.mapper';
import { CalendarEventDto } from '../dtos/calendar-event.dto';
import { CalendarEvent } from '../entities/calendar-event.entity';
import { CreateCalendarEventDto } from '../dtos/create-calendar-event.dto';
import { UpdateCalendarEventDto } from '../dtos/update-calendar-event.dto';
import { CalendarEventNotFoundException } from '../exceptions/calendar-event-not-found.exception';

@Injectable()
export class CalendarEventsService {
  constructor(
    @InjectRepository(CalendarEvent)
    private readonly _calendarEventRepository: Repository<CalendarEvent>
  ) { }

  public async getAllCalendarEvents(accountId: number): Promise<CalendarEventDto[]> {
    const events: CalendarEvent[] = await this._calendarEventRepository.find({
      where: {
        account: { id: accountId },
        deletedAt: IsNull()
      }
    });
    return CalendarEventMapper.toCalendarEventDtoList(events);
  }

  public async createCalendarEvent(accountId: number, createCalendarEventDto: CreateCalendarEventDto): Promise<CalendarEventDto> {
    const event: CalendarEvent = this._calendarEventRepository.create({
      title: createCalendarEventDto.title,
      startDateTime: createCalendarEventDto.startDateTime,
      endDateTime: createCalendarEventDto.endDateTime,
      isAllDay: createCalendarEventDto.isAllDay,
      color: createCalendarEventDto.color,
      location: createCalendarEventDto.location,
      description: createCalendarEventDto.description,
      account: { id: accountId }
    });
    return CalendarEventMapper.toCalendarEventDto(
      await this._calendarEventRepository.save(event)
    );
  }

  public async updateCalendarEventById(accountId: number, eventId: number, updateCalendarEventDto: UpdateCalendarEventDto): Promise<CalendarEventDto> {
    const event: CalendarEvent = await this._calendarEventRepository.findOne({
      id: eventId,
      account: { id: accountId }
    });
    if (!event) throw new CalendarEventNotFoundException();
    
    event.title = updateCalendarEventDto.title;
    event.startDateTime = updateCalendarEventDto.startDateTime;
    event.endDateTime = updateCalendarEventDto.endDateTime;
    event.isAllDay = updateCalendarEventDto.isAllDay;
    event.color = updateCalendarEventDto.color;
    event.location = updateCalendarEventDto.location;
    event.description = updateCalendarEventDto.description;
    
    return CalendarEventMapper.toCalendarEventDto(
      await this._calendarEventRepository.save(event)
    );
  }

  public async deleteCalendarEventById(accountId: number, eventId: number): Promise<CalendarEventDto> {
    const event: CalendarEvent = await this._calendarEventRepository.findOne({
      id: eventId,
      account: { id: accountId }
    });
    if (!event) throw new CalendarEventNotFoundException();
    event.deletedAt = new Date();
    
    return CalendarEventMapper.toCalendarEventDto(
      await this._calendarEventRepository.save(event)
    );
  }

  public async getCalendarEventById(accountId: number, eventId: number): Promise<CalendarEventDto> {
    const event: CalendarEvent = await this._calendarEventRepository.findOne({
      id: eventId,
      account: { id: accountId }
    });
    if (!event) throw new CalendarEventNotFoundException();
    return CalendarEventMapper.toCalendarEventDto(event);
  }

  public async getCalendarEventsBetweenDates(accountId: number, startDate: Date, endDate: Date): Promise<CalendarEventDto[]> {
    const events: CalendarEvent[] = await this._calendarEventRepository.find({
      where: [
        // If start date 
        {
          account: { id: accountId },
          deletedAt: IsNull(),
          startDateTime: Between(startDate.toISOString(), endDate.toISOString())
        },
        {
          account: { id: accountId },
          deletedAt: IsNull(),
          endDateTime: Between(startDate.toISOString(), endDate.toISOString())
        },
        {
          account: { id: accountId },
          deletedAt: IsNull(),
          startDateTime: LessThanOrEqual(startDate.toISOString()),
          endDateTime: MoreThanOrEqual(endDate.toISOString())
        }
      ],
      order: {
        startDateTime: 'ASC'
      }
    })
    return CalendarEventMapper.toCalendarEventDtoList(events);
  }
}
