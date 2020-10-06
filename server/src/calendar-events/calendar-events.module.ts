import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { CalendarEventsController } from './controllers/calendar-events.controller';
import { CalendarEventsService } from './services/calendar-events.service';
import { CalendarEvent } from './entities/calendar-event.entity';

@Module({
  controllers: [
    CalendarEventsController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      CalendarEvent
    ])
  ],
  providers: [
    CalendarEventsService
  ]
})
export class CalendarEventsModule {}
