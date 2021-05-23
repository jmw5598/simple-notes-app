import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LessThan, LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { CreateTodoDto } from '../dtos/create-todo.dto';
import { TodoDto } from '../dtos/todo.dto';
import { Todo } from '../entities/todo.entity';
import { TodosMapper } from '../mappers/todos.mapper';

import { TodoNotFoundException } from '../exceptions/todo-not-found.exception';
import { UpdateTodoDto } from '../dtos/update-todo.dto';

@Injectable()
export class TodosService {
  constructor(
    @InjectRepository(Todo)
    private readonly _todosRepository: Repository<Todo>
  ) {}

  public async getAllTodos(accountId: number): Promise<TodoDto[]> {
    return TodosMapper.toTodoDtoList(
      await this._todosRepository.find({ where: { account: { id: accountId } } })
    )
  }

  public async createTodo(accountId: number, createTodoDto: CreateTodoDto): Promise<TodoDto> {
    const newTodo: Todo = this._todosRepository.create({
      description: createTodoDto.description,
      isComplete: false
    });

    return TodosMapper.toTodoDto(
      await this._todosRepository.save(newTodo)
    );
  }

  public async deleteTodo(accountId: number, todoId: number): Promise<TodoDto> {
    const todo: Todo = await this._todosRepository.findOne({
      where: { account: { id: accountId }, id: todoId }
    });

    if (!todo) throw new TodoNotFoundException();
    todo.deletedAt = new Date();

    return TodosMapper.toTodoDto(
      await this._todosRepository.save(todo)
    )
  }

  public async updateTodo(accountId: number, todoId: number, updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    let todo: Todo = await this._todosRepository.findOne({
      where: { account: { id: accountId }, id: todoId }
    });

    if (!todo) throw new TodoNotFoundException();
    
    todo.updatedAt = new Date();
    todo.description = updateTodoDto.description;
    todo.isComplete = updateTodoDto.isComplete;

    return TodosMapper.toTodoDto(
      await this._todosRepository.save(todo)
    );
  }

  public async getTodosBetweenDates(accountId: number, startDate: Date, endDate: Date): Promise<TodoDto[]> {
    // TODO :)
    return [];
  }

  public async getTodaysTodos(accountId: number): Promise<TodoDto[]> {
    const today: Date = new Date();
    const todaysTodos: Todo[] = await this._todosRepository.find({
      where: {
        account: { id: accountId },
        startedBy: LessThanOrEqual(today.toISOString()),
        completedBy: MoreThanOrEqual(today.toISOString())
      }
    });
    return TodosMapper.toTodoDtoList(todaysTodos);
  }

  public async getPastDueTodos(accountId: number): Promise<TodoDto[]> {
    const today: Date = new Date();
    const pastDueTodos: Todo[] = await this._todosRepository.find({
      where: {
        account: { id: accountId },
        completedBy: LessThan(today.toISOString),
        isComplete: false
      }
    });
    return TodosMapper.toTodoDtoList(pastDueTodos);
  }
}

// where: [
//         // If start date 
//         {
//           account: { id: accountId },
//           deletedAt: IsNull(),
//           startDateTime: Between(today.toISOString(), endDate.toISOString())
//         },
//         {
//           account: { id: accountId },
//           deletedAt: IsNull(),
//           endDateTime: Between(startDate.toISOString(), endDate.toISOString())
//         },
//         {
//           account: { id: accountId },
//           deletedAt: IsNull(),
//           startDateTime: LessThanOrEqual(startDate.toISOString()),
//           endDateTime: MoreThanOrEqual(endDate.toISOString())
//         }
//       ],
//       order: {
//         startDateTime: 'ASC'
//       }
