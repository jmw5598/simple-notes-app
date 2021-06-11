import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { ThemesGuard } from './themes.guard';

describe('ThemesGuard', () => {
  let guard: ThemesGuard;

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
    guard = TestBed.inject(ThemesGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to getThemes when the store is empty', () => {
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
