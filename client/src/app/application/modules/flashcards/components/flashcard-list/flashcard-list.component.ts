import { Component, Input, OnInit } from '@angular/core';
import { FlashcardSet } from '@sn/shared/models';

@Component({
  selector: 'sn-flashcard-list',
  templateUrl: './flashcard-list.component.html',
  styleUrls: ['./flashcard-list.component.scss']
})
export class FlashcardListComponent implements OnInit {
  @Input()
  public flashcardSets: FlashcardSet[];

  constructor() { }

  ngOnInit(): void {
  }

  public create(): void {

  }

  public view(): void {

  }

  public edit(): void {
    
  }

  public delete(): void {
    
  }
}
