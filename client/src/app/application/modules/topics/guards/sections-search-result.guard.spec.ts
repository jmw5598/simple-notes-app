import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SectionsSearchResultGuard } from './sections-search-result.guard';

describe('SectionsSearchResultGuard', () => {
  let guard: SectionsSearchResultGuard;
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
    guard = TestBed.inject(SectionsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
