import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DocumentsController } from './controllers/documents.controller';
import { LoggerModule } from '../logger/logger.module';
import { DocumentsService } from './services/documents.service';
import { Document } from './entities/document.entity';

@Module({
  controllers: [
    DocumentsController
  ],
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([Document])
  ],
  providers: [
    DocumentsService
  ]
})
export class DocumentsModule {}
