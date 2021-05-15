import { FlashcardDto } from "../dtos/flashcard.dto";
import { Flashcard } from "../entities/flashcard.entity";

export class FlashcardMapper {
  public static toFlashcardDto(flashcard: Flashcard): FlashcardDto {
    return {
      id: flashcard.id,
      createdAt: flashcard.createdAt,
      updatedAt: flashcard.updatedAt,
      frontContent: flashcard.frontContent,
      backContent: flashcard.backContent
    } as FlashcardDto;
  }

  public static toFlashcardDtoList(flashcards: Flashcard[]): FlashcardDto[] {
    return flashcards.map(
      (flashcard: Flashcard) => FlashcardMapper.toFlashcardDto(flashcard)
    );
  }
}
