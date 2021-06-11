import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { LayoutSidePanelState } from './layout-side-panel-state.enum';

@Injectable()
export class LayoutService {
  private _panelState: LayoutSidePanelState;
  private _panelStateSource: BehaviorSubject<LayoutSidePanelState>;

  constructor() {
    this._panelState = LayoutSidePanelState.OPEN;
    this._panelStateSource = new BehaviorSubject<LayoutSidePanelState>(this._panelState);
  }

  public onStateChanges(): Observable<LayoutSidePanelState> {
    return this._panelStateSource.asObservable();
  }

  public changeState(state: LayoutSidePanelState): void {
    this._panelState = state;
    this._panelStateSource.next(this._panelState);
  }
}
