import { Controller, Get, UseGuards, Request, Post, Delete, Put, Param, Body } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { TodoDto } from '../dtos/todo.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { TodosService } from '../services/todos.service';

@Controller('todos')
@UseGuards(JwtAuthenticationGuard)
export class TodosController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _todosService: TodosService
  ) {
    this._logger.setContext(this.constructor.name);
  }

  @Get()
  public async getAllTodos(@Request() request): Promise<TodoDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.getAllTodos(accountId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Post()
  public async createTodo(
    @Request() request): Promise<TodoDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.getAllTodos(accountId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Put(':id')
  public async updateTodo(
    @Request() request,
    @Param('id') todoId: number,
    @Body() updateTodoDto: UpdateTodoDto): Promise<TodoDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.updateTodo(accountId, todoId, updateTodoDto);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteTodo(
    @Request() request,
    @Param('id') todoId: number): Promise<TodoDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.deleteTodo(accountId, todoId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  // TODO check caledar event controll for this imple
  @Get('between')
  public async getTodosBetweenDates(
    @Request() request): Promise<TodoDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.getTodosBetweenDates(accountId, new Date(), new Date());
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }
  
  @Get('today')
  public async getTodosForTOday(
    @Request() request): Promise<TodoDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.getTodaysTodos(accountId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Get('pastdue')
  public async getPastDueTodos(
    @Request() request): Promise<TodoDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todosService.getPastDueTodos(accountId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }
}
