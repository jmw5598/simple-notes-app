import { TestBed } from '@angular/core/testing';

import { TodaysTodoListsGuard } from './todays-todo-lists.guard';

describe('TodaysTodoListsGuard', () => {
  let guard: TodaysTodoListsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(TodaysTodoListsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
