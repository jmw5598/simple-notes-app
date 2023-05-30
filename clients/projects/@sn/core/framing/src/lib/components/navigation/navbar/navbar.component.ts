import { Component, OnInit, HostListener, OnDestroy } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { LayoutService } from '../../layout/layout.service';
import { LayoutSidePanelState } from '../../layout/layout-side-panel-state.enum';

@Component({
  selector: 'sn-core-framing-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {
  private _destroy$: Subject<void> = new Subject<void>();
  private _currentScreenWidth: number;
  public currentLayoutSidePanelState$: Observable<LayoutSidePanelState>;
  public currentLayoutSidePanelState: LayoutSidePanelState;
  public LayoutSidePanelState = LayoutSidePanelState;

  constructor(    
    private _layoutService: LayoutService,
    private _window: Window
  ) { }

  ngOnInit(): void {
    this._triggerResizeEvent()
    this._selectState();
  }

  toggleSideNav() {
    console.log("toggline nav", this.currentLayoutSidePanelState)
    if (this.currentLayoutSidePanelState === LayoutSidePanelState.OPEN) {
      console.log("laredy open toggling....")
      this._shouldBeClosed() 
        ? this._layoutService.changeState(LayoutSidePanelState.CLOSE)
        : this._layoutService.changeState(LayoutSidePanelState.COLLAPSE)
    } else {
      console.log("setting open")
      this._layoutService.changeState(LayoutSidePanelState.OPEN);
    }
  }
  
  @HostListener('window:resize', ['$event'])
  onResize(event) {
    this._currentScreenWidth = event?.target?.innerWidth;
  }

  private _triggerResizeEvent(): void {
    this._window.dispatchEvent(new Event('resize'));
  }

  private _selectState(): void {
    this._layoutService.onStateChanges()
      .pipe(
        tap(state => this.currentLayoutSidePanelState = state),
        takeUntil(this._destroy$)
      ).subscribe();
  }

  private _shouldBeClosed(): boolean {
    return this._currentScreenWidth !== undefined && this._currentScreenWidth < 768;
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }
}
