import { Component, OnInit, HostListener, Input, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutSidePanelState } from '../../layout/layout-side-panel-state.enum';
import { LayoutService } from '../../layout/layout.service';
import { NavigationRouteLink } from '../navigation.models';
import { tap } from 'rxjs/operators';
import { OnDemandPreloadService } from '../../../preloading-strategies/on-demand-preload.service';

@Component({
  selector: 'sn-core-framing-navbar-side',
  templateUrl: './navbar-side.component.html',
  styleUrls: ['./navbar-side.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NavbarSideComponent implements OnInit {
  public LayoutSidePanelState = LayoutSidePanelState
  public tooltipDelay: number = 500;
  
  @Input()
  public links: NavigationRouteLink[] = [];

  private _currentScreenWidth: number;
  public currentPanelState$: Observable<LayoutSidePanelState>;
  public currentLayoutSidePanelState: LayoutSidePanelState;

  constructor(
    private _layoutService: LayoutService,
    private _onDemandPreloadService: OnDemandPreloadService,
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
