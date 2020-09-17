import { TestBed } from '@angular/core/testing';

import { TopicsGuard } from './topics.guard';

describe('TopicsGuard', () => {
  let guard: TopicsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TopicsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
