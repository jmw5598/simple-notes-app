import { Component, Input, OnInit } from '@angular/core';
import { NavigationRouteLink, OnDemandPreloadService } from '@sn/core/framing';

@Component({
  selector: 'sn-admin-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss']
})
export class SettingsNavigationComponent implements OnInit {
  @Input()
  public links: NavigationRouteLink[];
  
  constructor(
    private _onDemandPreloadService: OnDemandPreloadService
  ) { }

  ngOnInit(): void {
  }

  public preloadBundle(routePath: string[]): void {
    this._onDemandPreloadService.startPreload(routePath.join('/'));
  }
}
