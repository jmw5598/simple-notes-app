import { Component } from '@angular/core';
import { fadeAnimation } from '@sn/user/shared/animations';
import { LayoutSidePanelState } from '@sn/user/shared/components';
import { OverlayLoaderStyle, OverlaySpinnerSize } from '@sn/user/shared/components';

@Component({
  selector: 'sn-user-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  animations: [fadeAnimation]
})
export class ApplicationComponent {
  public LayoutSidePanelState = LayoutSidePanelState;
  public OverlaySpinnerSize = OverlaySpinnerSize;
  public OverlayLoaderStyle = OverlayLoaderStyle;
}
