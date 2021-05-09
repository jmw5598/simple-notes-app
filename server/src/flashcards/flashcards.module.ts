import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { FlashcardsController } from './controllers/flashcards.controller';
import { FlashcardsService } from './services/flashcards.service';

@Module({
  imports: [
    LoggerModule
  ],
  controllers: [
    FlashcardsController
  ],
  providers: [
    FlashcardsService
  ]
})
export class FlashcardsModule {}
