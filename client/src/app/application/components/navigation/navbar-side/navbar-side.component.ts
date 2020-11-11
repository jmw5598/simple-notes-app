import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService, LayoutSidePanelState } from '@sn/shared/components'
import { NavigationRouteLink, NAVIGATION_ROUTES } from './navigation.routes';

@Component({
  selector: 'sn-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements OnInit {
  public LayoutSidePanelState = LayoutSidePanelState
  public currentPanelState$: Observable<LayoutSidePanelState>;
  public links: NavigationRouteLink[] = NAVIGATION_ROUTES;

  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
    this.currentPanelState$ = this._layoutService.onStateChanges();
  }
}
