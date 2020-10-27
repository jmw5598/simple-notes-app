import { CalendarIntegrationDto } from './calendar-integration.dto';

export class CalendarIntegrationTypeDto {
  public id: number;
  public name: string;
  public calendarIntegrations?: CalendarIntegrationDto[]
}
