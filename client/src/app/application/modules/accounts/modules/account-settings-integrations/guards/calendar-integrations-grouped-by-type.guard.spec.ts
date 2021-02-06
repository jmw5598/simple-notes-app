import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { CalendarIntegrationsGroupedByTypeGuard } from './calendar-integrations-grouped-by-type.guard';

describe('CalendarIntegrationsGroupedByTypeGuard', () => {
  let guard: CalendarIntegrationsGroupedByTypeGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) {
      return this._data.asObservable()
    },
    dispatch: function(action: any) {
      this._data.next(action)
    }
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

  it('should dispatch action to getCalendarIntegrationsGroupedByType when store is empty', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeFalse();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore.dispatch({});
  });
});
