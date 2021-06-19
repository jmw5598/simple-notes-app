import { TestBed } from '@angular/core/testing';

import { AccountsSearchResultGuard } from './accounts-search-result.guard';

describe('AccountsSearchResultGuard', () => {
  let guard: AccountsSearchResultGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(AccountsSearchResultGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
