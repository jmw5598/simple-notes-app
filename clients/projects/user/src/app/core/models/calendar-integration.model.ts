import { BaseModel } from './base.model';
import { CalendarIntegrationType } from './calendar-integration-type.model';

export class CalendarIntegration extends BaseModel {
  public expiresAt: Date;
  public calendarIntegrationType?: CalendarIntegrationType
}
