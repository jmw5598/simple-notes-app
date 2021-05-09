import { Module } from '@nestjs/common';
import { LoggerModule } from 'src/logger/logger.module';
import { FlashcardsController } from './controllers/flashcards.controller';

@Module({
  imports: [
    LoggerModule
  ],
  controllers: [
    FlashcardsController
  ]
})
export class FlashcardsModule {}
