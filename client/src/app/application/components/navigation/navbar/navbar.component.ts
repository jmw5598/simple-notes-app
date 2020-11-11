import { Component, OnInit, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LayoutService, LayoutSidePanelState } from '@sn/shared/components';

@Component({
  selector: 'sn-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  private _currentScreenWidth: number;
  public currentLayoutSidePanelState$: Observable<LayoutSidePanelState>;
  public currentLayoutSidePanelState: LayoutSidePanelState;
  public LayoutSidePanelState = LayoutSidePanelState;

  constructor(
    private _router: Router,
    private _layoutService: LayoutService
  ) { }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
    this.currentLayoutSidePanelState$ = this._layoutService.onStateChanges()
      .pipe(tap(state => this.currentLayoutSidePanelState = state));
  }

  logout() {
    this._router.navigate(['login']);
  }

  toggleSideNav() {
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
