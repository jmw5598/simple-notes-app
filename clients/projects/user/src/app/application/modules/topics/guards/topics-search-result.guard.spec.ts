import { TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { TopicsSearchResultGuard } from './topics-search-result.guard';

describe('TopicsSearchResultGuard', () => {
  let guard: TopicsSearchResultGuard;

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
    guard = TestBed.inject(TopicsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch searchTopics action when canActivate is called with an empty store', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore._data.next({ id: '1' });
  });
});
