import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'sn-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {

  @Input()
  isSpinning: boolean;

  constructor() {
    this.isSpinning = false;
  }

  ngOnInit() {}

}
