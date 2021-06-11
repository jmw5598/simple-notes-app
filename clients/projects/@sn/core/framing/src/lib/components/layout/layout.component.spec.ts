import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { skip, take } from 'rxjs/operators';
import { LayoutSidePanelState } from './layout-side-panel-state.enum';

import { LayoutComponent } from './layout.component';
import { LayoutService } from './layout.service';

describe('LayoutComponent', () => {
  let component: LayoutComponent;
  let fixture: ComponentFixture<LayoutComponent>;
  let layoutService: LayoutService
  const mockWindow: Window = {
    innerWidth: 767
  } as Window;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LayoutComponent
      ],
      providers: [
        LayoutService,
        {
          provider: 'Window',
          useValue: mockWindow
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LayoutComponent);
    component = fixture.componentInstance;
    layoutService = TestBed.inject(LayoutService);
    fixture.detectChanges();
  });

  beforeEach(() => {
    component.ngOnInit();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should receive new panel state change values when LayoutService.changeState is called with new state', (done) => {
    const stateToSet: LayoutSidePanelState = LayoutSidePanelState.CLOSE;
    component.currentPanelState$
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(stateToSet);
        done()
      });
    layoutService.changeState(stateToSet);
  });

  it('should set panel state to LayoutPanelState.CLOSE when window width < 768px', (done) => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(767);
    component.currentPanelState$
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(LayoutSidePanelState.CLOSE);
        done();
      });
    component.onResize(null);
  });

  it('should set panel state to LayoutPanelState.COLLAPSE when window width < 991 AND >= 768', (done) => {
    spyOnProperty(window, 'innerWidth', 'get').and.returnValue(990);
    component.currentPanelState$
      .pipe(
        skip(1),
        take(1)
      ).subscribe(state => {
        expect(state).toBe(LayoutSidePanelState.COLLAPSE);
        done();
      });
    component.onResize(null);
  });
});
