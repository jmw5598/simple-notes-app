import { ChangeDetectionStrategy, Component, HostBinding, Input, OnInit } from '@angular/core';
import { NavigationRouteLink, OnDemandPreloadService } from '@sn/core/framing';

@Component({
  selector: 'sn-admin-settings-navigation',
  templateUrl: './settings-navigation.component.html',
  styleUrls: ['./settings-navigation.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNavigationComponent {
  @HostBinding('class')
  public hostClasses: string = 'flex flex-col w-full justify-start items-start';

  @Input()
  public links: NavigationRouteLink[];
  
  constructor(
    private _onDemandPreloadService: OnDemandPreloadService
  ) { }

  public preloadBundle(routePath: string[]): void {
    this._onDemandPreloadService.startPreload(routePath.join('/'));
  }
}
