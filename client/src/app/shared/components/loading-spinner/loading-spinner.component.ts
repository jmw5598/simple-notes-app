import { Component, OnInit, Input } from '@angular/core';
import { SpinnerSize } from './spinner-size.enum';

@Component({
  selector: 'sn-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss']
})
export class LoadingSpinnerComponent implements OnInit {
  @Input()
  public size: SpinnerSize;

  @Input()
  public text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
