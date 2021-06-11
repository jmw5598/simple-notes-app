import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LayoutService, LayoutSidePanelState } from '@sn/user/shared/components'
import { NavigationRouteLink, NAVIGATION_ROUTES } from './navigation.routes';
import { tap } from 'rxjs/operators';
import { OnDemandPreloadService } from '@sn/user/core/preloading-strategies';

@Component({
  selector: 'sn-user-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss']
})
export class NavbarSideComponent implements OnInit {
  public LayoutSidePanelState = LayoutSidePanelState
  public tooltipDelay: number = 500;
  
  public links: NavigationRouteLink[] = NAVIGATION_ROUTES;

  private _currentScreenWidth: number;
  public currentPanelState$: Observable<LayoutSidePanelState>;
  public currentLayoutSidePanelState: LayoutSidePanelState;

  constructor(
    private _layoutService: LayoutService,
    private _onDemandPreloadService: OnDemandPreloadService,
    private _router: Router
  ) { }

  ngOnInit() {
    this._selectState();
  }

  public preloadBundle(routePath: string[]): void {
    this._onDemandPreloadService.startPreload(routePath.join('/'));
  }

  public close(): void {
    if (this.currentLayoutSidePanelState === LayoutSidePanelState.OPEN) {
      this._shouldBeClosed() 
        ? this._layoutService.changeState(LayoutSidePanelState.CLOSE)
        : this._layoutService.changeState(LayoutSidePanelState.COLLAPSE)
    } else {
      this._layoutService.changeState(LayoutSidePanelState.OPEN);
    }
  }

  public navigateTo(routerLink: string | string[]): void {
    if (this.currentLayoutSidePanelState === LayoutSidePanelState.OPEN && this._shouldBeClosed()) {
      this._layoutService.changeState(LayoutSidePanelState.CLOSE);
    } 
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._currentScreenWidth = window.innerWidth;
  }

  private _selectState(): void {
    this.currentPanelState$ = this._layoutService.onStateChanges()
      .pipe(tap(state => this.currentLayoutSidePanelState = state));
  }

  private _shouldBeClosed(): boolean {
    return this._currentScreenWidth !== undefined && this._currentScreenWidth < 768;
  }
}
