import { Component, Input, OnInit } from '@angular/core';

export enum FlipAxis {
  X = 'flip-axis-x',
  Y = 'flip-axis-y'
}

@Component({
  selector: 'sn-flipcard',
  templateUrl: './flipcard.component.html',
  styleUrls: ['./flipcard.component.scss']
})
export class FlipcardComponent implements OnInit {
  @Input()
  public flipAxis: FlipAxis;
  
  public isFlipped: boolean;

  constructor() {
    this.isFlipped = false;
    this.flipAxis = FlipAxis.Y;
  }

  ngOnInit(): void {
  }

  public flipCard(): void {
    this.isFlipped = !this.isFlipped;
  }
}
