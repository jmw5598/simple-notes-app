import { TestBed } from '@angular/core/testing';

import { SectionByIdGuard } from './section-by-id.guard';

describe('SectionByIdGuard', () => {
  let guard: SectionByIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(SectionByIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
