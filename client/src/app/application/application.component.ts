import { Component } from '@angular/core';
import { LayoutSidePanelState } from '@sn/shared/components';
import { OverlayLoaderStyle, OverlaySpinnerSize } from '@sn/shared/components';

@Component({
  selector: 'sn-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent {
  public LayoutSidePanelState = LayoutSidePanelState;
  public OverlaySpinnerSize = OverlaySpinnerSize;
  public OverlayLoaderStyle = OverlayLoaderStyle;
}
