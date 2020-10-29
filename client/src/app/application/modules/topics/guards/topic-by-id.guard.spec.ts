import { TestBed } from '@angular/core/testing';

import { TopicByIdGuard } from './topic-by-id.guard';

describe('TopicByIdGuard', () => {
  let guard: TopicByIdGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TopicByIdGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
