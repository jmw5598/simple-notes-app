import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { PlansGuard } from './plans.guard';

describe('PlansGuard', () => {
  let guard: PlansGuard;
  const testStore = {
    select: () => of(),
    dispatch: () => {}
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        {
          provide: Store,
          useValue: testStore
        }
      ]
    });
    guard = TestBed.inject(PlansGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
