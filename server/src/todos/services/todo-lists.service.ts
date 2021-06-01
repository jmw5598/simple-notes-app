import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { Brackets, IsNull, Raw, Repository } from 'typeorm';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { TodoListDto } from '../dtos/todo-list.dto';
import { UpdateTodoListDto } from '../dtos/update-todo-list.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { TodoList } from '../entities/todo-list.entity';
import { Todo } from '../entities/todo.entity';
import { TodoListNotFoundException } from '../exceptions/todo-list-not-found.exception';
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

  public async deleteTodoListById(accountId: number, todoListId: number): Promise<TodoListDto> {
    const todoList: TodoList = await this._todoListsRepository.findOne({
      relations: ['todos'],
      where: {
        account: { id: accountId },
        id: todoListId
      }
    });

    if (!todoList) throw new TodoListNotFoundException();

    const now: Date = new Date();

    todoList.deletedAt = now;
    todoList.todos.forEach(todo => todo.deletedAt = now);

    return TodoListsMapper.toTodoListDto(
      await this._todoListsRepository.save(todoList)
    );
  }

  public async updateTodoListById(accountId: number, todoListId: number, updateTodoListDto: UpdateTodoListDto): Promise<TodoListDto> {
    const todoList: TodoList = await this._todoListsRepository.findOne({
      relations: ['todos'],
      where: {
        account: { id: accountId },
        id: todoListId
      }
    });

    if (!todoList) throw new TodoListNotFoundException();

    const today: Date = new Date();

    todoList.title = updateTodoListDto.title;
    todoList.startedBy = updateTodoListDto.startedBy;
    todoList.completedBy = updateTodoListDto.completedBy;
    todoList.updatedAt = new Date();
    
    todoList.todos = updateTodoListDto.todos.map((updateTodo: UpdateTodoDto, orderIndex: number) => {
      return this._todosRepository.create({
        ...updateTodo,
        orderIndex: orderIndex,
        updatedAt: today,
        completedAt: updateTodo.isComplete ? today : null
      });
    });
    
    return TodoListsMapper.toTodoListDto(
      await this._todoListsRepository.save(todoList)
    );
  }

  public async getTodoListById(accountId: number, todoListId: number): Promise<TodoListDto> {
    const todoList: TodoList = await this._todoListsRepository.findOne({
      relations: ['todos'],
      where: { account: { id: accountId }, id: todoListId }
    });
    if (!todoList) throw new TodoListNotFoundException();
    return TodoListsMapper.toTodoListDto(todoList);
  }

  public async getTodoListsBetweenDates(accountId: number, startDate: Date, endDate: Date): Promise<TodoListDto[]> {
    const todoLists: TodoList[] = await this._todoListsRepository
      .createQueryBuilder('list')
      .innerJoin('list.account', 'acc')
      .innerJoinAndSelect('list.todos', 'todo')
      .where('acc.id = :accountId', { accountId: accountId })
      .andWhere('list.deletedAt IS NULL')
      .andWhere(
        new Brackets((qb) => {
          qb
            .where(`DATE_TRUNC('day', "started_by") BETWEEN :startDate AND :endDate`, { 
              startDate: startDate.toISOString().split('T')[0], 
              endDate: endDate.toISOString().split('T')[0]
            })
            .orWhere(`DATE_TRUNC('day', "completed_by") BETWEEN :startDate AND :endDate`, {
              startDate: startDate.toISOString().split('T')[0], 
              endDate: endDate.toISOString().split('T')[0]
            })
            .orWhere(`DATE_TRUNC('day', "started_by") <= :startDate AND DATE_TRUNC('day', "completed_by") >= :endDate`, {
              startDate: startDate.toISOString().split('T')[0], 
              endDate: endDate.toISOString().split('T')[0]
            })
          }
        )
      )
      .orderBy({
        'list.startedBy': 'ASC',
        'todo.orderIndex': 'ASC'
      }).getMany();
    return TodoListsMapper.toTodoListDtoList(todoLists);
  }

  public async getTodoListsPastDueFromDate(accountId: number, pastDueDate: Date): Promise<TodoListDto[]> {
    const todoLists: TodoList[] = await this._todoListsRepository
      .createQueryBuilder('list')
      .innerJoin('list.account', 'acc')
      .innerJoinAndSelect('list.todos', 'todo')
      .where('acc.id = :accountId', { accountId: accountId })
      .andWhere('list.deletedAt IS NULL')
      .andWhere(`DATE_TRUNC('day', "completed_by") < :completedBy`, { completedBy: pastDueDate.toISOString().split('T')[0] })
      .orderBy({
        'list.startedBy': 'ASC',
        'todo.orderIndex': 'ASC'
      }).getMany();
    return TodoListsMapper.toTodoListDtoList(todoLists);
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
