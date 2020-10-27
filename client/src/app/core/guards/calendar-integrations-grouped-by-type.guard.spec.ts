import { TestBed } from '@angular/core/testing';

import { CalendarIntegrationsGroupedByTypeGuard } from './calendar-integrations-grouped-by-type.guard';

describe('CalendarIntegrationsGroupedByTypeGuard', () => {
  let guard: CalendarIntegrationsGroupedByTypeGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(CalendarIntegrationsGroupedByTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
