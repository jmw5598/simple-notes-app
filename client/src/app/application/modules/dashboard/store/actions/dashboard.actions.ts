import { createAction, props } from '@ngrx/store';
import { Topic } from '@sn/shared/models';
import { CalendarEvent } from '@sn/core/models';

export const getRecentTopics = createAction(
  '[Dashboard] Get Recent Topics'
);

export const getRecentTopicsSuccess = createAction(
  '[Dashboard] Get Recent Topics Success',
  props<{ topics: Topic[] }>()
);

export const getTodaysCalendarEvents = createAction(
  '[Dashboard] Get Todays Calendar Events'
);

export const getTodaysCalendarEventsSuccess = createAction(
  '[Dashboard] Get Todays Calendar Events Success',
  props<{ events: CalendarEvent[]}>()
);
