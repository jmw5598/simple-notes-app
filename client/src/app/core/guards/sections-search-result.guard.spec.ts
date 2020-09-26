import { TestBed } from '@angular/core/testing';

import { SectionsSearchResultGuard } from './sections-search-result.guard';

describe('SectionsSearchResultGuard', () => {
  let guard: SectionsSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SectionsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
