import { CalendarIntegrationDto } from '../dtos/calendar-integration.dto';
import { CalendarIntegration } from '../entities/calendar-integration.entity';
import { CalendarIntegrationTypeMapper } from './calendar-integration-type.mapper';

export class CalendarIntegrationMapper {
  public static toCalendarIntegartionDto(integration: CalendarIntegration): CalendarIntegrationDto {
    return {
      id: integration.id,
      expiresAt: integration.expiresAt,
      calendarIntegrationType: !integration.calendarIntegrationType ? 
        null : CalendarIntegrationTypeMapper.toCalendarIntegartionTypeDto(integration.calendarIntegrationType)
    } as CalendarIntegrationDto;
  }

  public static toCalendarIntegrationDtoList(integrations: CalendarIntegration[]): CalendarIntegrationDto[] {
    return integrations.map(i => CalendarIntegrationMapper.toCalendarIntegartionDto(i))
  }
}
