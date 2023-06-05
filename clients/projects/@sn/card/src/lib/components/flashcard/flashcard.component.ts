import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'sn-flashcard',
  templateUrl: './flashcard.component.html',
  styleUrls: ['./flashcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFlashcardComponent { }
