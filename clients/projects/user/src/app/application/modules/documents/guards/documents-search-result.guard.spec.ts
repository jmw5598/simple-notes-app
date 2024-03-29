import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

import { DocumentsSearchResultGuard } from './documents-search-result.guard';

describe('DocumentsSearchResultGuard', () => {
  let guard: DocumentsSearchResultGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
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
    guard = TestBed.inject(DocumentsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to searchDocuments when canActivate it called with an empty store', () => {
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
