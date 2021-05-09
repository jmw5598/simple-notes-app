import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/logger/logger.module';
import { FlashcardsController } from './controllers/flashcards.controller';
import { FlashcardSet } from './entities/flashcard-set.entity';
import { Flashcard } from './entities/flashcard.entity';
import { FlashcardsService } from './services/flashcards.service';

@Module({
  imports: [
    LoggerModule,
    TypeOrmModule.forFeature([
      Flashcard,
      FlashcardSet
    ])
  ],
  controllers: [
    FlashcardsController
  ],
  providers: [
    FlashcardsService
  ]
})
export class FlashcardsModule {}
