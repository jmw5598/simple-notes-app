import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { PageRequest } from 'src/common/models/page-request.model';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { TodoListDto } from '../dtos/todo-list.dto';
import { UpdateTodoListDto } from '../dtos/update-todo-list.dto';
import { UpdateTodoDto } from '../dtos/update-todo.dto';
import { TodoListsService } from '../services/todo-lists.service';

@Controller('todo-lists')
@UseGuards(JwtAuthenticationGuard)
export class TodoListsController {
  constructor(
    private readonly _logger: SnLoggerService,
    private readonly _todoListsService: TodoListsService
  ) {}

  @Get('search')
  public async serachFlashcardSets(
      @Request() request,
      @Query('page') page: number = 1,
      @Query('size') size: number = 10,
      @Query('sortCol') sortCol: string = 'createdAt',
      @Query('sortDir') sortDir: SortDirection = SortDirection.ASCENDING,
      @Query('searchTerm') searchTerm: string = ''): Promise<Page<TodoListDto>> {
    try {
      const pageable: IPageable = PageRequest.from(page, size, sortCol, sortDir); 
      const accountId: number = +request.user.accountId;
      return this._todoListsService.searchTodoLists(accountId, searchTerm, pageable); 
    } catch (error) {
      this._logger.error('Error searching flashcard sets!', error);
      throw error;
    }
  }

  @Post()
  public async createTodoList(
      @Request() request,
      @Body() createTodoListDto: CreateTodoListDto): Promise<TodoListDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.createTodoList(accountId, createTodoListDto); 
    } catch (error) {
      this._logger.error(`Error create new todo list!`, error);
      throw error;
    }
  }

  @Delete(':id')
  public async deleteTodoList(
      @Request() request,
      @Param('id') todoListId: number): Promise<TodoListDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.deleteTodoListById(accountId, todoListId);
    } catch (error) {
      this._logger.error(`Error deleting todo list wit given Id`, error);
      throw error;
    }
  }

  @Put(':id')
  public async udpateTodoList(
      @Request() request,
      @Param('id') todoListId: number,
      @Body() updateTodoListDto: UpdateTodoListDto): Promise<TodoListDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.updateTodoListById(accountId, todoListId, updateTodoListDto);
    } catch (error) {
      this._logger.error(`Error updating todo list width given Id`, error);
      throw error;
    }
  }

  @Get('today')
  public async getTodosForTOday(
    @Request() request): Promise<TodoListDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return [];
      //return this._todosService.getTodaysTodos(accountId);
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Get('pastdue')
  public async getPastDueTodos(
    @Request() request,
    @Query('pastDueDate') pastDueDate: string): Promise<TodoListDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.getTodoListsPastDueFromDate(accountId, new Date(pastDueDate));
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Get('between')
  public async getTodosBetweenDates(
      @Request() request,
      @Query('startDate') startDate: string,
      @Query('endDate') endDate: string): Promise<TodoListDto[]> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.getTodoListsBetweenDates(accountId, new Date(startDate), new Date(endDate));
    } catch (error) {
      this._logger.error(`Error getting all todos`, error);
      throw error;
    }
  }

  @Get(':id')
  public async getTodoListById(
      @Request() request,
      @Param('id') todoListId: number): Promise<TodoListDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.getTodoListById(accountId, todoListId);
    } catch (error) {
      this._logger.error(`Error getting todo list with supplied id!`, error);
      throw error;
    }
  }
}
