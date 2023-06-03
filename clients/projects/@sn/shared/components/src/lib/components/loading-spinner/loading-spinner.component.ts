import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SpinnerStyle } from './spinner-style.enum';

@Component({
  selector: 'sn-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
