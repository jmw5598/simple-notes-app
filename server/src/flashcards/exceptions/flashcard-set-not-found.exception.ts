import { NotFoundException } from '@nestjs/common';

export class FlashcardSetNotFoundException extends NotFoundException {
  constructor() {
    super(`Flashcard set with supplied id was not found!`);
  }
}
