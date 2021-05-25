import { TestBed } from '@angular/core/testing';

import { TodosSearchResultGuard } from './todos-search-result.guard';

describe('TodosSearchResultGuard', () => {
  let guard: TodosSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TodosSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
