import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FlashcardSet } from '@sn/shared/models';

@Component({
  selector: 'sn-user-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  @Input()
  public flashcardSets: FlashcardSet[];

  @Output()
  public onCreate: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onView: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onEdit: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  public onDelete: EventEmitter<any> = new EventEmitter<any>();

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {
    this.onCreate.emit();
  }

  public view(flashcardSet: FlashcardSet): void {
    this.onView.emit(flashcardSet);
  }

  public edit(flashcardSet: FlashcardSet): void {
    this.onEdit.emit(flashcardSet);
  }

  public delete(flashcardSetId: number): void {
    this.onDelete.emit(flashcardSetId);
  }
}
