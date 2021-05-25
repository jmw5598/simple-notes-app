import { Body, Controller, Delete, Get, Param, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { request } from 'http';
import { JwtAuthenticationGuard } from 'src/authentication/guards/jwt-authentication.guard';
import { SortDirection } from 'src/common/enums/sort-direction.enum';
import { PageRequest } from 'src/common/models/page-request.model';
import { Page } from 'src/common/models/page.model';
import { IPageable } from 'src/common/models/pageable.interface';
import { SnLoggerService } from 'src/logger/sn-logger.service';
import { CreateTodoListDto } from '../dtos/create-todo-list.dto';
import { TodoListDto } from '../dtos/todo-list.dto';
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
      @Body() updateTodoListDto: UpdateTodoDto): Promise<TodoListDto> {
    try {
      const accountId: number = +request.user.accountId;
      return this._todoListsService.updateTodoListById(accountId, todoListId, updateTodoListDto);
    } catch (error) {
      this._logger.error(`Error updating todo list width given Id`, error);
      throw error;
    }
  }
}
