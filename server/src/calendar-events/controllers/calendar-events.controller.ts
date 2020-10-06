import { Body, Controller, Delete, Get, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { CalendarEventsService } from '../services/calendar-events.service';
import { CalendarEventDto } from '../dtos/calendar-event.dto';
import { SnLoggerService } from '../../logger/sn-logger.service';
import { CalendarEvent } from '../entities/calendar-event.entity';
import { JwtAuthenticationGuard } from '../../authentication/guards/jwt-authentication.guard';
import { request } from 'express';
import { CreateCalendarEventDto } from '../dtos/create-calendar-event.dto';
import { create } from 'domain';
import { UpdateCalendarEventDto } from '../dtos/update-calendar-event.dto';

@Controller('calendar/events')
@UseGuards(JwtAuthenticationGuard)
export class CalendarEventsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _calendarEventsService: CalendarEventsService
  ) {
    this._logger.setContext(this.constructor.name);
  }
  
  @Get()
  public async getAllCalendarEvents(@Request() request): Promise<CalendarEventDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarEventsService.getAllCalendarEvents(accountId);
    } catch (error) {
      this._logger.error('Error getting all calendar events!', error);
      throw error;
    }
  }

  @Post()
  public async createCalendarEvent(
      @Request() request,
      @Body() createCalendarEventDto: CreateCalendarEventDto): Promise<CalendarEventDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarEventsService.createCalendarEvent(accountId, createCalendarEventDto);
    } catch (error) {
      this._logger.error('Error creating calendar event!', error);
      throw error;
    }
  }

  @Put(':id')
  public async updateCalendarEvent(
      @Request() request,
      @Param('id') eventId: number,
      @Body() updateCalendarEventDto: UpdateCalendarEventDto): Promise<CalendarEventDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarEventsService.updateCalendarEventById(accountId, eventId, updateCalendarEventDto);
    } catch (error) {
      this._logger.error('Error updating calendar event!', error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteCalendEvent(
      @Request() request,
      @Param('id') eventId: number): Promise<CalendarEventDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._calendarEventsService.deleteCalendarEventById(accountId, eventId);
    } catch (error) {
      this._logger.error('Error deleting calendar event!', error);
      throw error;
    }
  }
}
