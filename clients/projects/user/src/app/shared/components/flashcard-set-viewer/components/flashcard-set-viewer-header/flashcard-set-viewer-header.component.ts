import { Component, Input, OnInit } from '@angular/core';
import { Flashcard, FlashcardSet } from '@sn/user/shared/models';

@Component({
  selector: 'sn-user-flashcard-set-viewer-header',
  templateUrl: './flashcard-set-viewer-header.component.html',
  styleUrls: ['./flashcard-set-viewer-header.component.scss']
})
export class FlashcardSetViewerHeaderComponent implements OnInit {
  @Input()
  public flashcardSet: FlashcardSet;

  @Input()
  public flashcard: Flashcard;

  constructor() { }

  ngOnInit(): void {
  }

  public getIndexOfCurrentFlashcard(): number {
    return this.flashcardSet?.flashcards?.findIndex(fc => fc.id === this.flashcard?.id) + 1 || 0;
  }
}
