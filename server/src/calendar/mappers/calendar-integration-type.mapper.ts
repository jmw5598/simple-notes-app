import { CalendarIntegrationTypeDto } from '../dtos/calendar-integration-type.dto';
import { CalendarIntegrationType } from '../entities/calendar-integration-type.entity';
import { CalendarIntegration } from '../entities/calendar-integration.entity';
import { CalendarIntegrationMapper } from './calendar-integration.mapper';

export class CalendarIntegrationTypeMapper {
  public static toCalendarIntegartionTypeDto(type: CalendarIntegrationType): CalendarIntegrationTypeDto {
    return {
      id: type.id,
      name: type.name
    } as CalendarIntegrationTypeDto;
  }

  public static toCalendIntegrationTypeDtoListWithIntegrations(types: CalendarIntegrationType[], integrations: CalendarIntegration[]): CalendarIntegrationTypeDto[] {
    return types.map(type => {
      return {
        ...CalendarIntegrationTypeMapper.toCalendarIntegartionTypeDto(type),
        calendarIntegrations: CalendarIntegrationMapper.toCalendarIntegrationDtoList(
          integrations.filter(i => i?.calendarIntegrationType?.id === type.id)
        )
      } as CalendarIntegrationTypeDto
    });
  }
}
