import { CalendarOptions } from '@fullcalendar/core';

import bootstrapPlugin from '@fullcalendar/bootstrap';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

// TODO define colors? Enum?
const TEXT_COLOR_DEFAULT: string = '#FFFFFF';
const BORDER_COLOR_DEFAULT: string = '#14b8a6';
const BACKGROUND_COLOR_DEFAULT: string = '#14b8a6'

export const CALENDAR_OPTIONS_DEFAULT: CalendarOptions = {
  initialView: 'dayGridMonth',
  themeSystem: 'bootstrap',
  buttonText: {
    next: 'Next',
    prev: 'Prev'
  },
  eventSources: [
  ],
  eventBackgroundColor: BACKGROUND_COLOR_DEFAULT,
  eventBorderColor: BORDER_COLOR_DEFAULT,
  eventTextColor: TEXT_COLOR_DEFAULT,
  editable: true,
  plugins: [
    bootstrapPlugin,
    dayGridPlugin,
    interactionPlugin,
  ]
};