import { CalendarIntegrationType } from "../entities/calendar-integration-type.entity";

export class CalendarIntegrationDto {
  public id: number;
  public expiresAt: Date;
  public calendarIntegrationType?: CalendarIntegrationType;
}
