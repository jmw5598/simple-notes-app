import { Module } from '@nestjs/common';
import { TodosService } from './services/todos.service';
import { TodosController } from './controllers/todos.controller';
import { LoggerModule } from 'src/logger/logger.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Todo } from './entities/todo.entity';

@Module({
  providers: [
    TodosService
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Todo
    ])
  ],
  controllers: [
    TodosController
  ]
})
export class TodosModule {}
