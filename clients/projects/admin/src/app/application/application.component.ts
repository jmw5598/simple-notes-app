import { Component, OnInit } from '@angular/core';
import { LayoutSidePanelState, NavigationRouteLink } from '@sn/core/framing';
import { fadeAnimation } from '@sn/shared/animations';
import { NAVIGATION_ROUTES } from './navigation-routes.config';

@Component({
  selector: 'sn-admin-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent {
  public LayoutSidePanelState = LayoutSidePanelState;
  // public OverlaySpinnerSize = OverlaySpinnerSize;
  // public OverlayLoaderStyle = OverlayLoaderStyle;
  public links: NavigationRouteLink[] = NAVIGATION_ROUTES;
}
