import { Component, OnInit, Input, HostListener } from '@angular/core';
import { Observable } from 'rxjs';
import { LayoutSidePanelPosition } from './layout-side-panel-position.enum';
import { LayoutSidePanelState } from './layout-side-panel-state.enum';
import { LayoutService } from './layout.service';

@Component({
  selector: 'sn-user-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  @Input()
  public sidePanelPosition: LayoutSidePanelPosition;

  @Input()
  public set defaultState(state: LayoutSidePanelState) {
    this._layoutService.changeState(state);
  }
  
  public currentPanelState$: Observable<LayoutSidePanelState>;

  constructor(private _layoutService: LayoutService) {
    this.sidePanelPosition = LayoutSidePanelPosition.LEFT;
  }

  ngOnInit(): void {
    window.dispatchEvent(new Event('resize'));
    this.currentPanelState$ = this._layoutService.onStateChanges();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event) {
    const width: number = window.innerWidth;
    if (width < 768) 
      this._layoutService.changeState(LayoutSidePanelState.CLOSE);
    else if (width < 991)
      this._layoutService.changeState(LayoutSidePanelState.COLLAPSE);
  }
}
