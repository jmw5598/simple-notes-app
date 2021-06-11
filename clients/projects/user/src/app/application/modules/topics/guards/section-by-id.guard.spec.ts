import { TestBed } from '@angular/core/testing';
import { ActivatedRoute, ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { Store } from '@ngrx/store';
import { BehaviorSubject, of } from 'rxjs';
import { take } from 'rxjs/operators';

import { SectionByIdGuard } from './section-by-id.guard';

describe('SectionByIdGuard', () => {
  let guard: SectionByIdGuard;
  let route: ActivatedRoute;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable() },
    dispatch: function(action: any) { this._data.next(action) }
  }

  const mockQueryParams = {
    topicId: '1',
    sectionId: '2'
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
    guard = TestBed.inject(SectionByIdGuard);
    route = TestBed.inject(ActivatedRoute);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('should dispatch action to getSectionById when canActivate is called with empty store', () => {
    spyOn(testStore, 'dispatch');
    guard.canActivate(route.snapshot)
      .pipe(take(1))
      .subscribe(canActivate => {
        expect(canActivate).toBeTrue();
      });
    expect(testStore.dispatch).toHaveBeenCalledTimes(1);
    testStore._data.next({ id: mockQueryParams.sectionId });
  });
});
