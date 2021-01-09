import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { AccountDetailsGuard } from './account-details.guard';

describe('AccountDetailsGuard', () => {
  let guard: AccountDetailsGuard;
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
    guard = TestBed.inject(AccountDetailsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
