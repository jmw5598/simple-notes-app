import { Component, OnInit, Input, ChangeDetectionStrategy } from '@angular/core';
import { SnSpinnerStyle } from './spinner-style.enum';

@Component({
  selector: 'sn-loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SnLoadingSpinnerComponent implements OnInit {
  @Input()
  public style: SnSpinnerStyle = SnSpinnerStyle.DARK;

  @Input()
  public text: string;

  constructor() { }

  ngOnInit(): void {
  }

}
