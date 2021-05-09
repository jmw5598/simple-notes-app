import { FlashcardSetDto } from "../dtos/flashcard-set.dto";
import { FlashcardSet } from "../entities/flashcard-set.entity";

export class FlashcardSetMapper {
  public static toFlashcardSetDto(flashcardSet: FlashcardSet): FlashcardSetDto {
    return {} as FlashcardSetDto;
  }

  public static toFlashcardSetDtoList(flashcardSets: FlashcardSet[]): FlashcardSetDto[] {
    return flashcardSets.map(
      (flashcard: FlashcardSet) => FlashcardSetMapper.toFlashcardSetDto(flashcard)
    );
  }
}
