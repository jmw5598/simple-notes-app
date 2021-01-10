import { TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { LayoutSidePanelState } from './layout-side-panel-state.enum';

import { LayoutService } from './layout.service';

describe('LayoutService', () => {
  let service: LayoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should dispatch LayoutSidePanelState.OPEN state when changeState is called with state', (done) => {
    const stateToSet: LayoutSidePanelState = LayoutSidePanelState.OPEN;
    service.onStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(stateToSet);
        done();
      });
    service.changeState(stateToSet);
  });

  it('should dispatch LayoutSidePanelState.CLOSE state when changeState is called with state', (done) => {
    const stateToSet: LayoutSidePanelState = LayoutSidePanelState.CLOSE;
    service.onStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(stateToSet);
        done();
      });
    service.changeState(stateToSet);
  });

  it('should dispatch LayoutSidePanelState.COLLAPSE state when changeState is called with state', (done) => {
    const stateToSet: LayoutSidePanelState = LayoutSidePanelState.COLLAPSE;
    service.onStateChanges()
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(stateToSet);
        done();
      });
    service.changeState(stateToSet);
  });
});
