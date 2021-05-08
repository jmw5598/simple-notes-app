import { Module } from '@nestjs/common';
import { DocumentBuilderService } from './services/document-builder.service';

@Module({
  providers: [DocumentBuilderService],
  exports: [DocumentBuilderService]
})
export class DocumentBuilderModule {}
