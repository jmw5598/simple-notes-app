import { BaseModel } from './base.model';
import { CalendarIntegrationState } from './integrations/calendar-integration-state.model';
import { IntegrationStatus } from './integrations/integration-status.enum';

export class CalendarIntegration extends BaseModel {
  public expiresAt: Date;
}