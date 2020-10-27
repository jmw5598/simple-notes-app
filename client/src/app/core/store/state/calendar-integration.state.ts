import { CalendarIntegration, CalendarIntegrationType } from "../../models";

export interface ICalendarIntegrationState {
  calendarIntegrations: CalendarIntegration[],
  calendarIntegrationTypes: CalendarIntegrationType[],
  calendarIntegrationsGroupedByType: CalendarIntegrationType[]
}

export const initialCalendarIntegrationState: ICalendarIntegrationState = {
  calendarIntegrations: null,
  calendarIntegrationTypes: null,
  calendarIntegrationsGroupedByType: null
}