import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from '../logger/logger.module';
import { CalendarEventsController } from './controllers/calendar-events.controller';
import { CalendarEventsService } from './services/calendar-events.service';
import { CalendarEvent } from './entities/calendar-event.entity';
import { CalendarIntegrationsController } from './controllers/calendar-integrations.controller';
import { CalendarIntegrationsService } from './services/calendar-integrations.service';
import { CalendarIntegration } from './entities/calendar-integration.entity';
import { CalendarIntegrationType } from './entities/calendar-integration-type.entity';

@Module({
  controllers: [
    CalendarEventsController,
    CalendarIntegrationsController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      CalendarEvent,
      CalendarIntegration,
      CalendarIntegrationType
    ])
  ],
  providers: [
    CalendarEventsService,
    CalendarIntegrationsService
  ]
})
export class CalendarModule {}
