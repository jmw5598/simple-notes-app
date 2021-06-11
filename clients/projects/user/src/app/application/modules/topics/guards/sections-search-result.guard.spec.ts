import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { SectionsSearchResultGuard } from './sections-search-result.guard';

describe('SectionsSearchResultGuard', () => {
  let guard: SectionsSearchResultGuard;
  let route: ActivatedRoute;
  const mockQueryParams = { topicId: '1' };
  
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
        },
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: convertToParamMap(mockQueryParams)
            }
          }
        }
      ]
    });
    guard = TestBed.inject(SectionsSearchResultGuard);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to searchSections when canActivate is called with an empty store', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(route.snapshot)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore._data.next({ id: mockQueryParams.topicId });
  });
});
