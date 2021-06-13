import { TestBed } from '@angular/core/testing';

import { TodoListsService } from './todo-lists.service';

describe('TodoListsService', () => {
  let service: TodoListsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TodoListsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
