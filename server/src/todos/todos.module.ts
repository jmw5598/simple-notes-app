import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosController } from './controllers/todos.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';
import { TodoListsController } from './controllers/todo-lists.controller';
import { TodoListsService } from './services/todo-lists.service';
import { TodoList } from './entities/todo-list.entity';

@Module({
  providers: [
    TodosService,
    TodoListsService
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Todo,
      TodoList
    ])
  ],
  controllers: [
    TodosController,
    TodoListsController
  ]
})
export class TodosModule {}
