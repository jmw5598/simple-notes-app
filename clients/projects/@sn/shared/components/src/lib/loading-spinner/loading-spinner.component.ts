import { Component, OnInit, Input } from '@angular/core';
import { SpinnerStyle } from './spinner-style.enum';

@Component({
  selector: 'sn-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  public style: SpinnerStyle = SpinnerStyle.DARK;

  @Input()
  public text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
