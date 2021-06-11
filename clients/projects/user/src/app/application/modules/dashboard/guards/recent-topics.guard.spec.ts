import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { RecentTopicsGuard } from './recent-topics.guard';

describe('RecentTopicsGuard', () => {
  let guard: RecentTopicsGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable() },
    dispatch: function(action: any) { this._data.next(action) }
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
    guard = TestBed.inject(RecentTopicsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to getRecentTopics when canActivate is called with empty store', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore.dispatch({});
  })
});
