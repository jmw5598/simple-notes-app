import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export enum SnFlipAxis {
  X = 'flip-axis-x',
  Y = 'flip-axis-y'
}

@Component({
  selector: 'sn-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnFlipcardComponent implements OnInit {
  @Input()
  public flipAxis: SnFlipAxis;
  
  @Input()
  public isFlipped: boolean;

  @Output()
  public isFlippedChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {
    this.isFlipped = false;
    this.flipAxis = SnFlipAxis.Y;
  }

  ngOnInit(): void {
  }

  public flipCard(): void {
    this.isFlipped = !this.isFlipped;
    this.isFlippedChange.emit(this.isFlipped);
  }
}
