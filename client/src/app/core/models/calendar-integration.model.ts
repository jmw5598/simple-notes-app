import { BaseModel } from './base.model';
import { CalendarIntegrationState } from './integrations/calendar-integration-state.model';
import { IntegrationStatus } from './integrations/integration-status.enum';

export class CalendarIntegration extends BaseModel {
  public id: number;
  public name: string;
  public expiresAt: Date;
  public status: IntegrationStatus;
}