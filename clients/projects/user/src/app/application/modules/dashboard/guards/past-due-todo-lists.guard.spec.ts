import { TestBed } from '@angular/core/testing';

import { PastDueTodoListsGuard } from './past-due-todo-lists.guard';

describe('PastDueTodoListsGuard', () => {
  let guard: PastDueTodoListsGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(PastDueTodoListsGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
