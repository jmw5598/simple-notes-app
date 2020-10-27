import { TestBed } from '@angular/core/testing';

import { CalendarIntegrationsService } from './calendar-integrations.service';

describe('CalendarIntegrationsService', () => {
  let service: CalendarIntegrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CalendarIntegrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
