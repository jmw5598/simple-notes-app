import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { AccountDetailsGuard } from './account-details.guard';

describe('AccountDetailsGuard', () => {
  let guard: AccountDetailsGuard;

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
    guard = TestBed.inject(AccountDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to getAccountDetails when since the store is empty', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeFalse();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore.dispatch({});
  })
});
