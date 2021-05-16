import { Component, OnInit } from '@angular/core';
import { FlashcardSetViewerControlsService } from '../../services/flashcard-set-viewer-controls.service';

@Component({
  selector: 'sn-flashcard-set-viewer-controls',
  templateUrl: './flashcard-set-viewer-controls.component.html',
  styleUrls: ['./flashcard-set-viewer-controls.component.scss']
})
export class FlashcardSetViewerControlsComponent implements OnInit {
  public readonly tooltipPlacement: string = 'bottom';
  public readonly tooltipDelay: number = 500;

  constructor(
    private _controlsService: FlashcardSetViewerControlsService
  ) { }

  ngOnInit(): void {
  }

  public first(): void {
    this._controlsService.first();
  }

  public previous(): void {
    this._controlsService.previous();
  }

  public random(): void {
    this._controlsService.random();
  }

  public flip(): void {
    this._controlsService.flip();
  }

  public next(): void {
    this._controlsService.next();
  }

  public last(): void {
    this._controlsService.last();
  }
}
