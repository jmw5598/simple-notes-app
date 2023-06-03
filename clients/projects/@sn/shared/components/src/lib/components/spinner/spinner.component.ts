import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'sn-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SpinnerComponent implements OnInit {
  @Input()
  public isSpinning: boolean;

  @Input()
  public message: string;

  constructor() {
    this.isSpinning = false;
  }

  ngOnInit() {}

}
