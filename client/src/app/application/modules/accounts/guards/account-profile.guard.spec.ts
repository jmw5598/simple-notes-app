import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';

import { AccountProfileGuard } from './account-profile.guard';

describe('AccountProfileGuard', () => {
  let guard: AccountProfileGuard;
  const testStore = jasmine.createSpyObj('Store', ['select', 'dispatch']);

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(AccountProfileGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
