import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from './entities/category.entity';
import { LoggerModule } from '../logger/logger.module';
import { Topic } from './entities/topic.entity';
import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';
import { Section } from './entities/section.entity';
import { SectionsController } from './controllers/sections.controller';
import { SectionsService } from './services/sections.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Category, 
      Topic, 
      Section
    ])
  ],
  controllers: [
    TopicsController, 
    SectionsController
  ],
  providers: [
    TopicsService, 
    SectionsService
  ]
})
export class TopicsModule {}
