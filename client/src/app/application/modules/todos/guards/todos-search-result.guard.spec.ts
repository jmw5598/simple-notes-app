import { fakeAsync, TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { BehaviorSubject } from 'rxjs';
import { skip, take } from 'rxjs/operators';

import { TodosSearchResultGuard } from './todos-search-result.guard';

describe('TodosSearchResultGuard', () => {
  let guard: TodosSearchResultGuard;

  const testStore = {
    _data: new BehaviorSubject<any>(null),
    select: function(selector: any) { return this._data.asObservable(); },
    dispatch: function(action: any) { this._data.next(action) }
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        TodosSearchResultGuard,
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(TodosSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });

  it('shoulde dispatch action to search todo lists when canActviate is called with empty store value for searchTodoListResults', () => {
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
