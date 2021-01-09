import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { TopicsSearchResultGuard } from './topics-search-result.guard';

describe('TopicsSearchResultGuard', () => {
  let guard: TopicsSearchResultGuard;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
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
});
