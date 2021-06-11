import { Component } from '@angular/core';
import { fadeAnimation } from '@sn/user/shared/animations';
import { LayoutSidePanelState, NavigationRouteLink } from '@sn/core/framing';
import { OverlayLoaderStyle, OverlaySpinnerSize } from '@sn/user/shared/components';

import { NAVIGATION_ROUTES } from './navigation-routes.config';

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
  public links: NavigationRouteLink[] = NAVIGATION_ROUTES;
}
