import { Component, OnInit } from '@angular/core';
import { NavigationRouteLink } from '@sn/core/framing';

import { fadeAnimation } from '@sn/shared/animations';
import { AbstractPageOverlayLoader, OverlayLoaderService } from '@sn/shared/components';

import { SETTINGS_NAVIGATION_ROUTES } from '../../settings-navigation-routes.config';

@Component({
  selector: 'sn-admin-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  animations: [fadeAnimation]
})
export class SettingsComponent extends AbstractPageOverlayLoader implements OnInit {
  public readonly links: NavigationRouteLink[] = SETTINGS_NAVIGATION_ROUTES
  
  constructor(
    protected _overlayLoaderService: OverlayLoaderService
  ) {
    super(_overlayLoaderService);
  }

  ngOnInit(): void {
    this._overlayLoaderService.setLoadingState(false);
  }
}
