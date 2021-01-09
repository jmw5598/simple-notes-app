import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { CalendarEventsService } from './calendar-events.service';

describe('CalendarEventsService', () => {
  let service: CalendarEventsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CalendarEventsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
