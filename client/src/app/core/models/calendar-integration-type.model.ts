import { BaseModel } from './base.model';
import { CalendarIntegration } from './calendar-integration.model';

export class CalendarIntegrationType extends BaseModel {
  public name: string;
  public integration?: CalendarIntegration;
}
