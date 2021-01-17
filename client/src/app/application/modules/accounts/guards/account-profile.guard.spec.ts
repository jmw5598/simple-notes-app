import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject, EMPTY, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { AccountProfileGuard } from './account-profile.guard';

describe('AccountProfileGuard', () => {
  let guard: AccountProfileGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { 
      return this._data.asObservable() 
    },
    dispatch: function(action: any) { 
      this._data.next(action);
    }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(AccountProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to getAccountProfile since the store is empty', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(testStore.dispatch).toHaveBeenCalledTimes(1);
        expect(canActivate).toBeFalse();
      });
    testStore.dispatch({});
  });
});
