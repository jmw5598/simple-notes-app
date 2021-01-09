import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { CalendarIntegrationsGroupedByTypeGuard } from './calendar-integrations-grouped-by-type.guard';

describe('CalendarIntegrationsGroupedByTypeGuard', () => {
  let guard: CalendarIntegrationsGroupedByTypeGuard;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  }

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(CalendarIntegrationsGroupedByTypeGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
