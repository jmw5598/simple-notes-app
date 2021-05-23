import { Test, TestingModule } from '@nestjs/testing';
import { TodoListsService } from './todo-lists.service';

describe('TodoListsService', () => {
  let service: TodoListsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TodoListsService],
    }).compile();

    service = module.get<TodoListsService>(TodoListsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
