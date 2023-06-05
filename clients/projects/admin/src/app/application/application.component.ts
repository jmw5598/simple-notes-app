import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LayoutSidePanelState, NavigationRouteLink } from '@sn/core/framing';
import { fadeAnimation } from '@sn/shared/animations';
import { NAVIGATION_ROUTES } from './navigation-routes.config';

@Component({
  selector: 'sn-admin-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class ApplicationComponent {
  public LayoutSidePanelState = LayoutSidePanelState;
  public links: NavigationRouteLink[] = NAVIGATION_ROUTES;
}
