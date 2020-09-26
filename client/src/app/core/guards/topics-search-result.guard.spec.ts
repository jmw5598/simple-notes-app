import { TestBed } from '@angular/core/testing';

import { TopicsSearchResultGuard } from './topics-search-result.guard';

describe('TopicsSearchResultGuard', () => {
  let guard: TopicsSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TopicsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
