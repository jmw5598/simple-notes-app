import { Logger, Module } from '@nestjs/common';

import { LoggerModule } from '../logger/logger.module';
import { TopicsController } from './controllers/topics.controller';
import { TopicsService } from './services/topics.service';
import { SectionsController } from './controllers/sections.controller';
import { SectionsService } from './services/sections.service';

@Module({
  imports: [
    LoggerModule
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
