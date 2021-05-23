import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { IsNull, Raw, Repository } from 'typeorm';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { TodoListDto } from '../dtos/todo-list.dto';
import { TodoList } from '../entities/todo-list.entity';
import { Todo } from '../entities/todo.entity';
import { TodoListsMapper } from '../mappers/todo-lists.mapper';

@Injectable()
export class TodoListsService {
  constructor(
    @InjectRepository(TodoList)
    private readonly _todoListsRepository: Repository<TodoList>,
    @InjectRepository(Todo)
    private readonly _todosRepository: Repository<Todo>
  ) {}

  public async searchTodoLists(accountId: number, searchTerm: string, pageable: IPageable): Promise<Page<TodoListDto>> {
    const sort: {[key: string]: string} = pageable.getSort().asKeyValue();
    const where = await this._generateSearchWhereClause(accountId, searchTerm);
    const result = await this._todoListsRepository.findAndCount({
      relations: ['todos'],
      where: where,
      order: sort,
      skip: ((pageable.getPageNumber() - 1) * pageable.getPageSize()),
      take: pageable.getPageSize()
    });
    const elements: TodoListDto[] = TodoListsMapper.toTodoListDtoList(result[0]);
    const totalElements: number = result[1];
    return this._generatePageResult(elements, totalElements, pageable);
  }

  public async createTodoList(accountId: number, createFlashcardSetDto: CreateTodoListDto): Promise<TodoListDto> {
    const todoList: TodoList = await this._todoListsRepository.save(
      this._todoListsRepository.create({
        title: createFlashcardSetDto.title,
        startedBy: createFlashcardSetDto.startedBy,
        completedBy: createFlashcardSetDto.completedBy,
        account: { id: accountId },
        todos: createFlashcardSetDto.todos.map((todo: CreateTodoDto, index: number) => {
          return this._todosRepository.create({
            description: todo.description,
            isComplete: false,
            orderIndex: index
          })
        })
      })
    );
    return TodoListsMapper.toTodoListDto(todoList);
  }

  private async _generateSearchWhereClause(accountId: number, searchTerm: string): Promise<any> {
    const ilike = Raw(alias => `${alias} ILIKE '%${searchTerm.replace("/\s/g", "%")}%'`)
    return [
      { title: ilike, account: { id: accountId }, deletedAt: IsNull() }
    ];
  }

  private async _generatePageResult(elements: TodoListDto[], totalElements: number, pageable: IPageable): Promise<Page<TodoListDto>> {
    return {
      elements: elements, 
      totalElements: totalElements, 
      totalPages: Math.ceil(totalElements / pageable.getPageSize()),
      current: pageable,
      next: pageable.next(totalElements),
      previous: pageable.previous(totalElements)
    } as Page<TodoListDto>;
  }
}
