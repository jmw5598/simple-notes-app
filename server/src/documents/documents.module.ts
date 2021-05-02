import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './controllers/documents.controller';
import { LoggerModule } from '../logger/logger.module';
import { DocumentsService } from './services/documents.service';
import { Document } from './entities/document.entity';
import { DocumentTopic } from './entities/document-topic.entity';
import { DocumentTopicSection } from './entities/document-topic-section.entity';

@Module({
  controllers: [
    DocumentsController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Document,
      DocumentTopic,
      DocumentTopicSection
    ])
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule {}
