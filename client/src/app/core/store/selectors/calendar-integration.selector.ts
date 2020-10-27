import { createSelector, createFeatureSelector } from '@ngrx/store';
import { ICalendarIntegrationState } from '../state/calendar-integration.state';

export const selectCalendarIntegrationState = createFeatureSelector<ICalendarIntegrationState>("calendarIntegrations");

