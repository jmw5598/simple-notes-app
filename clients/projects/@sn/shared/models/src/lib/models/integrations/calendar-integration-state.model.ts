import { IntegrationStatus } from './integration-status.enum';

// TODO Delete this! It will not be needed
export class CalendarIntegrationState {

  // Should hold the id of the calendar integration ( need to loop up on backend?)
  public type: string;
  public expiresAt?: Date;
  public status: IntegrationStatus;
}
