import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NavigationRouteLink } from '@sn/core/framing';

import { fadeAnimation } from '@sn/shared/animations';

import { SETTINGS_NAVIGATION_ROUTES } from '../../settings-navigation-routes.config';

@Component({
  selector: 'sn-admin-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [fadeAnimation]
})
export class SettingsComponent {
  public readonly links: NavigationRouteLink[] = SETTINGS_NAVIGATION_ROUTES
}
