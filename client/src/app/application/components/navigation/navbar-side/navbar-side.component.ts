import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutService, LayoutSidePanelState } from '@sn/shared/components'
import { NavigationRouteLink, NAVIGATION_ROUTES } from './navigation.routes';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'sn-navbar-side',
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

  constructor(private _layoutService: LayoutService) { }

  ngOnInit() {
    this.currentPanelState$ = this._layoutService.onStateChanges()
      .pipe(tap(state => this.currentLayoutSidePanelState = state));
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

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._currentScreenWidth = window.innerWidth;
  }

  private _shouldBeClosed(): boolean {
    return this._currentScreenWidth !== undefined && this._currentScreenWidth < 768;
  }
}
