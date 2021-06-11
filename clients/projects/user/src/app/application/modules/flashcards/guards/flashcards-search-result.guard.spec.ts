import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { FlashcardsSearchResultGuard } from './flashcards-search-result.guard';

describe('FlashcardsSearchResultGuard', () => {
  let guard: FlashcardsSearchResultGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        FlashcardsSearchResultGuard,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(FlashcardsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to search flashcard sets when canActaviet is called with an empty store value', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(null, null)
      .pipe(skip(1), take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      })
    testStore.dispatch({});
    expect(testStore.dispatch).toHaveBeenCalledTimes(2);
  });
});
