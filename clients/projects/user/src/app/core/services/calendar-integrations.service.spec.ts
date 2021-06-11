import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { CalendarIntegrationsService } from './calendar-integrations.service';

describe('CalendarIntegrationsService', () => {
  let service: CalendarIntegrationsService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ]
    });
    service = TestBed.inject(CalendarIntegrationsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
