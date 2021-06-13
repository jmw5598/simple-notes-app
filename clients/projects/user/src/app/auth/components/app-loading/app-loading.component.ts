import { Component } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';
import { SpinnerStyle } from '@sn/shared/components';

@Component({
  selector: 'sn-user-app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
  animations: [fadeAnimation]
})
export class AppLoadingComponent {
  public SpinnerStyle = SpinnerStyle;
}