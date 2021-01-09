import { TestBed } from '@angular/core/testing';
import { Store } from '@ngrx/store';
import { of } from 'rxjs';

import { SectionByIdGuard } from './section-by-id.guard';

describe('SectionByIdGuard', () => {
  let guard: SectionByIdGuard;
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
    guard = TestBed.inject(SectionByIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
