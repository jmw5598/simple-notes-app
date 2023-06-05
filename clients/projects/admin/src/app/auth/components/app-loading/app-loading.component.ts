import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { fadeAnimation } from '@sn/shared/animations';
import { SnSpinnerStyle } from '@sn/loading-spinner';

@Component({
  selector: 'sn-admin-app-loading',
  templateUrl: './app-loading.component.html',
  styleUrls: ['./app-loading.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class AppLoadingComponent {
  public SnSpinnerStyle = SnSpinnerStyle;
}
