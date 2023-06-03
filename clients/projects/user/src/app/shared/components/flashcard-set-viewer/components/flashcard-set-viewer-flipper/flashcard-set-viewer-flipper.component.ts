import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Flashcard } from '@sn/shared/models';

@Component({
  selector: 'sn-user-flashcard-set-viewer-flipper',
  templateUrl: './flashcard-set-viewer-flipper.component.html',
  styleUrls: ['./flashcard-set-viewer-flipper.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FlashcardSetViewerFlipperComponent implements OnInit {
  @Input()
  public flashcard: Flashcard;

  @Input()
  public isFlipped: boolean;
  
  constructor() { }

  ngOnInit(): void {
  }

}
