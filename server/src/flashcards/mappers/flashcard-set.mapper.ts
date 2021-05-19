import { FlashcardSetDto } from "../dtos/flashcard-set.dto";
import { FlashcardSet } from "../entities/flashcard-set.entity";
import { FlashcardMapper } from "./flashcard.mapper";

export class FlashcardSetMapper {
  public static toFlashcardSetDto(flashcardSet: FlashcardSet, includeFlashcards: boolean = false): FlashcardSetDto {
    return {
      id: flashcardSet.id,
      createdAt: flashcardSet.createdAt,
      updatedAt: flashcardSet.updatedAt,
      title: flashcardSet.title,
      synopsis: flashcardSet.synopsis,
      flashcards: includeFlashcards ? FlashcardMapper.toFlashcardDtoList(flashcardSet?.flashcards || []) : []
    } as FlashcardSetDto;
  }

  public static toFlashcardSetDtoList(flashcardSets: FlashcardSet[]): FlashcardSetDto[] {
    return flashcardSets.map(
      (flashcard: FlashcardSet) => FlashcardSetMapper.toFlashcardSetDto(flashcard)
    );
  }
}
